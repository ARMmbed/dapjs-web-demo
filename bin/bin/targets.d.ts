import { CortexM, Device } from "dapjs";
export declare class K64F extends CortexM {
    private flashAlgo;
    constructor(device: Device);
    /**
     * Initialise the flash driver on the chip. Must be called before any of the other
     * flash-related methods.
     *
     * **TODO**: check that this has been called before calling other flash methods.
     */
    flashInit(): Promise<void>;
    /**
     * Upload a binary blob to (non-volatile) flash memory, at the specified address. Uses the
     * flashing algorithm relevant to the particular part - if you just want to upload to RAM,
     * use `this.writeBlock`.
     *
     * @param code an array of 32-bit words representing the binary data to be uploaded.
     * @param address starting address of the location in memory to upload to.
     */
    flash(code: number[], address?: number): Promise<void>;
    /**
     * Erase _all_ data stored in flash on the chip.
     */
    eraseChip(): Promise<number>;
    private resetStopOnReset();
    /**
     * Run specified machine code natively on the device. Assumes usual C calling conventions
     * - returns the value of r0 once the program has terminated. The program _must_ terminate
     * in order for this function to return. This can be achieved by placing a `bkpt`
     * instruction at the end of the function.
     *
     * **FIXME**: currently causes a hard fault when the core is resumed after successfully uploading
     * the blob to memory and setting core registers.
     *
     * @param code array containing the machine code (32-bit words).
     * @param address memory address at which to place the code.
     * @param pc initial value of the program counter.
     * @param sp initial value of the stack pointer.
     * @param lr initial value of the link register.
     *
     * @returns A promise for the value of r0 on completion of the function call.
     */
    private runCode(code, address, pc, lr, sp?);
}
