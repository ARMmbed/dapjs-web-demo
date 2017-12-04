 function arrToString(arr) {
    let r = "";
    for (let i = 0; i < arr.length; ++i) {
        r += ("0000" + i).slice(-4) + ": " + ("00000000" + (arr[i] >>> 0).toString(16)).slice(-8);

        if (i !== arr.length - 1) {
            r += "\n";
        }
    }
    return r;
}

function machineStateToString(s) {
    return "REGS:\n" + arrToString(s.registers);
}

async function resume() {
    await this.target.resume();
    log("Resumed.");
}

async function printRegisters() {
    const halt = false;

    await this.target.halt();
    const st = await snapshotMachineState();

    clearLog();
    log(machineStateToString(st));
}

async function step() {
    await this.target.debug.step();
    const st = await snapshotMachineState();

    clearLog();
    log(machineStateToString(st));
}

function log(data) {
    logger = document.getElementById("logger");
    logger.innerHTML = logger.innerHTML + data + "\n";
}

function clearLog() {
    document.getElementById("logger").innerHTML = "";
}

/**
 * Snapshot the current state of the CPU. Reads all general-purpose registers, and returns them in an array.
 */
async function snapshotMachineState() {
    const state = {
        registers: [],
    };
    for (let i = 0; i < 16; i++) {
        state.registers[i] = await this.target.readCoreRegister(i);
    }
    return state;
}

async function connect() {
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

async function halt() {
    await this.target.halt();
    log("Halted.");
}

async function flash(binary){
    // Erase flash
    await this.target.halt();
    this.flashProgressBar.style.width = "0%";
    this.flashProgressBarContainer.style.display = "block";

    console.log(binary);

    const xhr = new XMLHttpRequest();
    if (this.deviceCode === "9900") {
        binary += ".hex";
        xhr.responseType = "text";
    } else {
        binary += ".bin";
        xhr.responseType = "arraybuffer";
    }
    xhr.open("GET", binary, true);

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

async function selectBoard() {
    this.device = await navigator.usb.requestDevice({ filters: [{vendorId: 0x0d28}]});
    this.deviceCode = this.device.serialNumber.slice(0, 4);
    const platform = await this.selector.lookupDevice(this.deviceCode);
    document.getElementById("connect").disabled = false;
    document.getElementById("platform-chooser").disabled = false;
    document.getElementById("platform-chooser").innerHTML = `<option value='${platform.productCode}' id='${platform.productCode}'>${platform.name}</option>`;
}

window.onload = function() {
    this.flashProgressBar = document.getElementById('flash-progress');
    this.flashProgressBarContainer = document.getElementById('progress-container');
    this.selector = new DAPjs.PlatformSelector();
};
