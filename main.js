 const arrToString = (arr) => {
    let r = "";
    for (let i = 0; i < arr.length; ++i) {
        r += ("0000" + i).slice(-4) + ": " + ("00000000" + (arr[i] >>> 0).toString(16)).slice(-8);

        if (i !== arr.length - 1) {
            r += "\n";
        }
    }
    return r;
};

const machineStateToString = (s) => {
    return "REGS:\n" + arrToString(s.registers);
};

const resume = async () => {
    await this.target.resume();
    log("Resumed.");
}

const printRegisters = async () => {
    const halt = false;

    await this.target.halt();
    const st = await snapshotMachineState();

    clearLog();
    log(machineStateToString(st));
}

const step = async () => {
    await this.target.debug.step();
    const st = await snapshotMachineState();

    clearLog();
    log(machineStateToString(st));
}

const log = (data) => {
    logger = document.getElementById("logger");
    logger.innerHTML = logger.innerHTML + data + "\n";
}

const clearLog = () => {
    document.getElementById("logger").innerHTML = "";
}

/**
 * Snapshot the current state of the CPU. Reads all general-purpose registers, and returns them in an array.
 */
const snapshotMachineState = async () => {
    const state = {
        registers: [],
    };
    for (let i = 0; i < 16; i++) {
        state.registers[i] = await this.target.readCoreRegister(i);
    }
    return state;
}

const connect = async () => {
    this.hid = new DAPjs.HID(this.device);

    log("Opening device.");

    // open hid device
    await this.hid.open();

    log("Device opened.");

    this.dapDevice = new DAPjs.DAP(this.hid);
    this.target = new DAPjs.FlashTarget(this.dapDevice, DAPjs.FlashTargets.get(this.deviceCode));

    log("Initialising device.");

    await this.target.init();

    log("Halting target.");

    await this.target.halt();

    log("Target halted.");

    const [imp, isa, type] = await this.target.readCoreType();
    log(`Connected to an ARM ${DAPjs.CoreNames.get(type)} (${DAPjs.ISANames.get(isa)})`);

    document.getElementById("connect").disabled = true;

    const elements = Array.from(document.querySelectorAll(".when-connected"));

    for (const elem of elements) {
        elem.disabled = false;
    }
}

const halt = async () => {
    await this.target.halt();
    log("Halted.");
}

const flash = async (f) => {
    // Erase flash
    await this.target.halt();
    this.flashProgressBar.style.width = "0%";
    this.flashProgressBarContainer.style.display = "block";

    console.log(f);

    const xhr = new XMLHttpRequest();
    if (this.deviceCode === "9900") {
        f += ".hex";
        xhr.responseType = "text";
    } else {
        f += ".bin";
        xhr.responseType = "arraybuffer";
    }
    xhr.open("GET", f, true);

    xhr.onload = async (e) => {
        if (this.deviceCode === "9900") {
            console.log("Flashing a micro:bit hex");

            const program = DAPjs.FlashProgram.fromIntelHex(xhr.responseText);
            await this.target.program(program, (progress) => {
                this.flashProgressBar.style.width = `${progress * 100}%`;
            });

            log(`Successfully flashed binary.`);
            log("Done.");

            await this.target.reset();
        } else {
            console.log("Flashing a K64F binary");

            const array = new Uint32Array(xhr.response);
            const program = DAPjs.FlashProgram.fromBinary(0, array);

            log(`Binary file ${array.length} words long`);

            // Push binary to board
            await this.target.program(program, (progress) => {
                this.flashProgressBar.style.width = `${progress * 100}%`;
            });

            log(`Successfully flashed binary.`);
            log("Done.");

            await this.target.reset();

            // make sure we don't have any issues flashing twice in the same session.
            this.target.flashUnInit();
        }
    };

    xhr.send();
}

const selectBoard = async () => {
    this.device = await navigator.usb.requestDevice({ filters: [{vendorId: 0x0d28}]});
    this.deviceCode = this.device.serialNumber.slice(0, 4);
    const platform = await this.selector.lookupDevice(this.deviceCode);
    document.getElementById("connect").disabled = false;
    document.getElementById("platform-chooser").disabled = false;
    document.getElementById("platform-chooser").innerHTML = `<option value='${platform.productCode}' id='${platform.productCode}'>${platform.name}</option>`;
}

window.onload = () => {
    this.flashProgressBar = document.getElementById('flash-progress');
    this.flashProgressBarContainer = document.getElementById('progress-container');
    this.selector = new DAPjs.PlatformSelector();
};
