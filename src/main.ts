import {CortexReg, Device, IMachineState, machineStateToString} from "dapjs";
import HID from "webhid";
import {K64F} from "./targets";

const logMachineState = (lbl: string) => {
    return (s: IMachineState) => {
        console.log(machineStateToString(s).replace(/^/gm, lbl + ": "));
        return s;
    };
};

$(() => {
    let hid: HID;
    let dev: Device;
    let cm: K64F;

    $("#click").click(async () => {
        const device = await navigator.usb.requestDevice({ filters: [{vendorId: 0x0d28}]});

        hid = new HID(device);
        await hid.open();

        $("#connect").prop("disabled", false);
    });

    $("#connect").click(async () => {
        try {
            dev = new Device(hid);
            cm = new K64F(dev);

            await cm.init();
            await cm.halt();

            console.log('Snapshotting');

            const st = await cm.snapshotMachineState();
            logMachineState("init")(st);

            console.log("Resuming core.");
            await cm.resume();

            
        } catch (e) {
            console.error(e);
            await dev.close();
        }
    });

    $("#flash").click(async () => {
        // flash the microcontroller we have connected.
        console.log("Flashing mcu :)");

        console.log("Initing flash");
        const r0 = await cm.flashInit();
        console.log("erasing");
        await cm.eraseChip();
        await dev.close();
    });
});
