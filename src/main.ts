import {CortexReg, Device, MachineState, machineStateToString} from "dapjs";
import HID from "webhid";
import {K64F} from "./targets";

const logMachineState = (lbl: string) => {
    return (s: MachineState) => {
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

            await cm.halt();
            const st = await cm.snapshotMachineState();
            logMachineState("init")(st);

            console.log("Resuming core.");
            await cm.resume();
        } catch (e) {
            console.error(e);
            dev.close();
        }
    });

    $("#flash").click(async () => {
        // flash the microcontroller we have connected.
        console.log("Flashing mcu :)");

        const r0 = await cm.flashInit();
        await cm.eraseChip();
        await dev.close();
    });
});
