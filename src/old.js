let hid: HID;
    let dev: Device;
    let cm: K64F;

    let ds = new DeviceSelector();
    ds.enumerateDevices();

    if (!navigator.usb) {
        $("#noWebUSB").show();
        return;
    }

    const log = (str: string) => {
        $("#trace").append(str + "\n");
    };

    const logClear = () => {
        $("#trace").html("");
    };

    $("#connect").click(async () => {
        $("#platform").attr("disabled", 1);
        $("#connect").attr("disabled", 1);

        $("#connect").html("Connecting");

        const device = await navigator.usb.requestDevice({ filters: [{vendorId: 0x0d28}]});
        hid = new HID(device);
        await hid.open();

        try {
            dev = new Device(hid);
            cm = new K64F(dev);

            await cm.init();
            await cm.halt();

            $("#click").html("Connected");
            log("Connected.");

            const [imp, isa, type] = await cm.readCoreType();

            log(`Found an ARM ${CoreNames.get(type)} (${ISANames.get(isa)})`);

            await cm.resume();
        } catch (e) {
            console.error(e);
            await dev.close();
        }

        $(".when-connected").attr("disabled", null);
    });

    $("#flash").click(async () => {
        // flash the microcontroller we have connected.
        logClear();

        log("Preparing to Flash MCU.");
        await cm.halt();

        log("Running flash init");
        await cm.flashInit();

        log('Flash initialisation complete.')

        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'blinky-red.bin', true);
        xhr.responseType = 'arraybuffer';
        
        xhr.onload = async (e: any) => {
          console.log(e);
          let array = Array.from(new Uint32Array(e.currentTarget.response.buffer));

          log(`Binary file ${array.length} words long`);
          await cm.flash(array);
          log(`Successfully flashed binary.`);
        };
        
        xhr.send();
    });

    $("#flash-erase").click(async () => {
        // Erase flash
        logClear();

        log("Running flashInit");

        const r0 = await cm.flashInit();
        log(`flashInit returned 0x${r0.toString(16)}`);

        const r1 = await cm.eraseChip();
        log(`flashErase returned 0x${r1.toString(16)}`);
    });

    $("#halt").click(async () => {
        await cm.halt();
        log("Halted.");
    });

    $("#resume").click(async () => {
        await cm.resume();
        log("Resumed.");
    });

    $("#registers").click(async () => {
        const halt = false;

        await cm.halt();
        const st = await cm.snapshotMachineState();
        // await cm.resume();

        logClear();
        log(machineStateToString(st));
    });

    $("#step-instruction").click(async () => {
        
    });