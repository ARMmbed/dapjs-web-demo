import {CortexM} from "dapjs";

export abstract class FlashTarget extends CortexM {
    public abstract flashInit(): Promise<number>;
    public abstract eraseChip(): Promise<number>;
    public abstract flash(data: number[]): Promise<void>;
}
