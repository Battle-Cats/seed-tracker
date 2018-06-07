import { ICat } from "../interfaces/ICat";

export interface IGachaSet {
    readonly name: string;
    readonly uberRareThreshold: number;
    readonly uberRarePercent: number;
    readonly superAndUberRareThreshold: number;
    readonly superAndUberRarePercent: number;
    rareCats: ReadonlyArray<ICat>;
    superRareCats: ReadonlyArray<ICat>;
    uberRareCats: ReadonlyArray<ICat>;
}