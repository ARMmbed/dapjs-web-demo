import {CoreNames, CortexM, CortexReg, DAP, ISANames} from "dapjs";
import {FlashTarget, FlashTargets} from "dapjs";
import HID from "webhid";

import {PlatformSelector} from "./device_selector";
import HTMLLogger from "./logger";

interface IMachineState {
    registers: number[];
}

const arrToString = (arr: number[]) => {
    let r = "";
    for (let i = 0; i < arr.length; ++i) {
        r += ("0000" + i).slice(-4) + ": " + ("00000000" + (arr[i] >>> 0).toString(16)).slice(-8);

        if (i !== arr.length - 1) {
            r += "\n";
        }
    }
    return r;
};

const machineStateToString = (s: IMachineState) => {
    return "REGS:\n" + arrToString(s.registers);
};

class DAPDemo {
    public target: FlashTarget;

    private readonly selector: PlatformSelector;
    private device: USBDevice;
    private hid: HID;
    private dapDevice: DAP;
    private deviceCode: string;

    private readonly chooseButton: HTMLButtonElement;
    private readonly connectButton: HTMLButtonElement;
    private readonly flashRedButton: HTMLButtonElement;
    private readonly flashGreenButton: HTMLButtonElement;
    private readonly printRegistersButton: HTMLButtonElement;
    private readonly stepButton: HTMLButtonElement;
    private readonly haltButton: HTMLButtonElement;
    private readonly resumeButton: HTMLButtonElement;

    private readonly logger: HTMLLogger;

    constructor(logger: HTMLLogger) {
        this.selector = new PlatformSelector("platform-chooser", "platform-detected");

        this.chooseButton = document.getElementById("choose") as HTMLButtonElement;
        this.connectButton = document.getElementById("connect") as HTMLButtonElement;
        this.flashRedButton = document.getElementById("flash-red") as HTMLButtonElement;
        this.flashGreenButton = document.getElementById("flash-green") as HTMLButtonElement;
        this.printRegistersButton = document.getElementById("registers") as HTMLButtonElement;
        this.stepButton = document.getElementById("step-instruction") as HTMLButtonElement;
        this.haltButton = document.getElementById("halt") as HTMLButtonElement;
        this.resumeButton = document.getElementById("resume") as HTMLButtonElement;

        this.chooseButton.onclick = this.choose;
        this.connectButton.onclick = this.connect;
        this.printRegistersButton.onclick = this.printRegisters;
        this.stepButton.onclick = this.step;
        this.haltButton.onclick = this.halt;
        this.resumeButton.onclick = this.resume;

        this.flashRedButton.onclick = async () => {
            await this.flash("blinky-red.bin");
        }

        this.flashGreenButton.onclick = async () => {
            await this.flash("blinky-green.bin");
        }

        this.logger = logger;
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

        this.log("Opening device.");

        // open hid device
        await this.hid.open();

        this.log("Device opened.");

        this.dapDevice = new DAP(this.hid);
        this.target = new FlashTarget(this.dapDevice, FlashTargets.get(this.deviceCode));

        this.log("Initialising device.");

        await this.target.init();

        this.log("Halting target.");

        await this.target.halt();

        this.log("Target halted.");

        const [imp, isa, type] = await this.target.readCoreType();
        this.log(`Connected to an ARM ${CoreNames.get(type)} (${ISANames.get(isa)})`);

        this.selector.disable();
        this.connectButton.disabled = true;

        const elements = Array.from(document.querySelectorAll(".when-connected"));

        for (const elem of elements) {
            (elem as HTMLButtonElement).disabled = false;
        }
    }

    private flash = async (f: string) => {
        // Erase flash
        await this.target.halt();
        await this.target.flashInit();
        await this.target.eraseChip();

        const xhr = new XMLHttpRequest();
        xhr.open("GET", f, true);
        xhr.responseType = "arraybuffer";

        xhr.onload = async (e: any) => {
            const array = new Uint32Array(xhr.response);

            this.log(`Binary file ${array.length} words long`);

            // Push binary to board
            await this.target.flash(array);

            this.log(`Successfully flashed binary.`);
            this.log("Done.");

            await this.target.reset();

            // make sure we don't have any issues flashing twice in the same session.
            this.target.flashUnInit();
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

    private log(s: string) {
        this.logger.log("[demo] " + s);
    }

    private clearLog() {
        this.logger.clear();
    }

    private printRegisters = async () => {
        const halt = false;

        await this.target.halt();
        const st = await this.snapshotMachineState();

        this.clearLog();
        this.log(machineStateToString(st));
    }

    private step = async () => {
        await this.target.debug.step();
        const st = await this.snapshotMachineState();

        this.clearLog();
        this.log(machineStateToString(st));
    }

    /**
     * Snapshot the current state of the CPU. Reads all general-purpose registers, and returns them in an array.
     */
    private async snapshotMachineState() {
        const state: IMachineState = {
            registers: [],
        };

        for (let i = 0; i < 16; i++) {
            state.registers[i] = await this.target.readCoreRegister(i);
        }

        return state;
    }
}

window.onload = () => {
    const logger = new HTMLLogger("#trace");
    const demo = new DAPDemo(logger);
};
