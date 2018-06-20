import { ICat } from "./ICat";
import { IGachaSet } from "./IGachaSet";


export interface IGachaCatRoll {
    cat: ICat;
    guaranteedUber: ICat;
    gacha: IGachaSet;
    slot: number;
    guaranteedUberSlot: number;
}

export interface ICatSelection {
    [gachaName: string]: IGachaCatRoll;
}


export interface IGachaRoll {
    readonly id: string;
    readonly scoreSeed: number;
    readonly slotSeed: number;
    readonly guaranteedUberSeed: number;
    readonly score: number;
    readonly hasUbers: boolean;
    readonly allUbers: boolean;
    rolledCats: ICatSelection[];
    showDetails: boolean;
}