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
    flashInit(): Promise<number>;
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
}
