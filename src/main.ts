import {CoreNames, CortexM, CortexReg, Device, IMachineState, ISANames, machineStateToString} from "dapjs";
import HID from "webhid";
import {MbedTarget, FlashAlgos} from "./targets";
import HTMLLogger from "./logger";
import {FlashTarget} from "./flash_target";
import {PlatformSelector} from "./device_selector";

class DAPDemo {
    private readonly selector: PlatformSelector;
    private device: USBDevice;
    private hid: HID;
    private dapDevice: Device;
    private target: FlashTarget;
    private deviceCode: string;

    private readonly chooseButton: HTMLButtonElement;
    private readonly connectButton: HTMLButtonElement;
    private readonly flashButton: HTMLButtonElement;
    private readonly eraseButton: HTMLButtonElement;
    private readonly printRegistersButton: HTMLButtonElement;
    private readonly stepButton: HTMLButtonElement;
    private readonly haltButton: HTMLButtonElement;
    private readonly resumeButton: HTMLButtonElement;

    private readonly logger: HTMLLogger;

    constructor() {
        this.selector = new PlatformSelector("platform-chooser", "platform-detected");

        this.chooseButton = document.getElementById("choose") as HTMLButtonElement;
        this.connectButton = document.getElementById("connect") as HTMLButtonElement;
        this.flashButton = document.getElementById("flash") as HTMLButtonElement;
        this.eraseButton = document.getElementById("flash-erase") as HTMLButtonElement;
        this.printRegistersButton = document.getElementById("registers") as HTMLButtonElement;
        this.stepButton = document.getElementById("registers") as HTMLButtonElement;
        this.haltButton = document.getElementById("halt") as HTMLButtonElement;
        this.resumeButton = document.getElementById("halt") as HTMLButtonElement;

        this.chooseButton.onclick = this.choose;
        this.connectButton.onclick = this.connect;
        this.flashButton.onclick = this.flash;
        this.eraseButton.onclick = this.erase;
        this.printRegistersButton.onclick = this.printRegisters;
        this.haltButton.onclick = this.halt;
        this.resumeButton.onclick = this.resume;

        this.logger = new HTMLLogger("#trace");
    }

    /**
     * Define `choose` as ES6 arrow function so that `this` is bound to the instance of DAPDemo, rather than bound to
     * the source of the click event.
     */
    private choose = async () => {
        this.device = await navigator.usb.requestDevice({ filters: [{vendorId: 0x0d28}]});
        this.deviceCode = this.device.serialNumber.slice(0, 4);

        const info = await this.selector.lookupDevice(this.deviceCode);

        this.selector.show(info);
        this.selector.enable();

        this.chooseButton.disabled = true;
        this.connectButton.disabled = false;
    }

    /**
     * Define `connect` as ES6 arrow function so that `this` is bound to the instance of DAPDemo, rather than bound to
     * the source of the click event.
     */
    private connect = async () => {
        this.hid = new HID(this.device);

        // open hid device
        await this.hid.open();

        this.dapDevice = new Device(this.hid);
        this.target = new MbedTarget(this.dapDevice, FlashAlgos.get(this.deviceCode));

        await this.target.init();
        await this.target.halt();

        const [imp, isa, type] = await this.target.readCoreType();
        this.log(`Connected to an ARM ${CoreNames.get(type)} (${ISANames.get(isa)})`);

        this.selector.disable();
        this.connectButton.disabled = true;

        const elements = Array.from(document.querySelectorAll(".when-connected"));

        for (const elem of elements) {
            (elem as HTMLButtonElement).disabled = false;
        }
    }

    private flash = async () => {
        this.clearLog();

        this.log("Preparing to flash device.");
        await this.target.halt();
        await this.target.init();
        await this.target.flashInit();

        this.log("Halted and initialised device.");

        const xhr = new XMLHttpRequest();
        xhr.open("GET", "blinky-red.bin", true);
        xhr.responseType = "arraybuffer";

        xhr.onload = async (e: any) => {
          const array = Array.from(new Uint32Array(xhr.response));

          this.log(`Binary file ${array.length} words long`);

          // Push binary to board
          await this.target.flash(array);

          this.log(`Successfully flashed binary.`);
        };

        xhr.send();
    }

    private halt = async () => {
        await this.target.halt();
        this.log("Halted.");
    }

    private resume = async () => {
        await this.target.resume();
        this.log("Resumed.");
    }

    private erase = async () => {
        // Erase flash
        this.clearLog();
        await this.target.halt();
        
        this.log("Running flashInit");

        const r0 = await this.target.flashInit();
        this.log(`flashInit returned 0x${r0.toString(16)}`);

        const r1 = await this.target.eraseChip();
        this.log(`flashErase returned 0x${r1.toString(16)}`);
    }

    private log(s: string) {
        this.logger.log("[demo] " + s);
    }

    private clearLog() {
        this.logger.clear();
    }

    private printRegisters = async () => {
        const halt = false;
        
        await this.target.halt();
        const st = await this.target.snapshotMachineState();

        this.clearLog();
        this.log(machineStateToString(st));
    }

    public step = async () => {
        await this.target.step();
        const st = await this.target.snapshotMachineState();

        this.clearLog();
        this.log(machineStateToString(st));
    }
}

window.onload = () => {
    const demo = new DAPDemo();
};
