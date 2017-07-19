import { CortexM, Device } from 'dapjs';
export declare class K64F extends CortexM {
    private flashAlgo;
    constructor(device: Device);
    flashInit(): Promise<void>;
    flash(code: number[]): Promise<void>;
    eraseChip(): Promise<number>;
    run_code(code: number[], address: number, pc: number, sp: number, lr: number): Promise<number>;
}
