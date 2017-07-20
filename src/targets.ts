import {CoreState, CortexM, CortexReg, CortexSpecialReg, Device} from "dapjs";
import {K64F_FLASH_ALGO} from "./k64f_flash";

/**
 * Specifies all of the parameters associated with a flashing algorithm for a particular device. These
 * can be found in the pyOCD or DAPLink sources, or compiled from the source that can be found here:
 * https://github.com/mbedmicro/FlashAlgo.
 *
 * **TODO**: add JavaScript as a third target for FlashAlgo's output.
 */
interface IFlashAlgo {
    loadAddress: number;
    pcInit: number;
    pcEraseAll: number;
    pcEraseSector: number;
    pcProgramPage: number;
    stackPointer: number;
    staticBase: number;
    instructions: number[];
    breakpointLocation: number;
}

export class K64F extends CortexM {
    private flashAlgo: IFlashAlgo;

    constructor(device: Device) {
        super(device);

        this.flashAlgo = K64F_FLASH_ALGO;
    }

    /**
     * Initialise the flash driver on the chip. Must be called before any of the other
     * flash-related methods.
     *
     * **TODO**: check that this has been called before calling other flash methods.
     */
    public async flashInit() {
        await this.halt();

        await this.writeCoreRegister(CortexReg.R9, this.flashAlgo.staticBase);

        const result = await this.runCode(
            this.flashAlgo.instructions,
            this.flashAlgo.loadAddress,
            this.flashAlgo.pcInit + this.flashAlgo.loadAddress + 0x20,
            this.flashAlgo.stackPointer,
            this.flashAlgo.breakpointLocation,
        );

        console.log(`run! ${result}`);

        // if (result !== 0) {
        //     // throw new Error("Invalid result code running flash init.");
        // }

        return result;
    }

    /**
     * Upload a binary blob to (non-volatile) flash memory, at the specified address. Uses the
     * flashing algorithm relevant to the particular part - if you just want to upload to RAM,
     * use `this.writeBlock`.
     *
     * @param code an array of 32-bit words representing the binary data to be uploaded.
     * @param address starting address of the location in memory to upload to.
     */
    public async flash(code: number[], address = 0x0) {
        throw new Error("Not implemented.");
    }

    /**
     * Erase _all_ data stored in flash on the chip.
     */
    public async eraseChip() {
        const result = await this.runCode(
            this.flashAlgo.instructions,
            this.flashAlgo.loadAddress,
            this.flashAlgo.pcEraseAll,
            this.flashAlgo.breakpointLocation,
        );
        const finalPC = await this.readCoreRegister(CortexReg.PC);

        console.log(result, finalPC.toString(16));
        return result;
    }

    private async resetStopOnReset() {
        console.log("reset stop on Reset");

        await this.halt();

        const demcr = await this.readMem(CortexSpecialReg.DEMCR);

        await this.writeMem(CortexSpecialReg.DEMCR, demcr | CortexSpecialReg.DEMCR_VC_CORERESET);
        await this.reset();

        while (!(await this.isHalted())) { /* spin */ }

        await this.writeMem(CortexSpecialReg.DEMCR, demcr);
    }
}
