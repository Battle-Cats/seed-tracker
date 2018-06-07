import { Rarity } from "../enums";

export interface ICat {
    readonly name: string;
    readonly id: number;
    readonly rarity: Rarity;
    readonly rarityString: string;
}
