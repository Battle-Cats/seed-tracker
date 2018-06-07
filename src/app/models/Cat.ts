import { ICat } from "../interfaces/ICat";
import { Rarity } from "../enums";


var rarityStrings : {[rarity: number]: string; } = {};
rarityStrings[Rarity.NonGacha] = "Non-Gacha";
rarityStrings[Rarity.Rare] = "Rare";
rarityStrings[Rarity.SuperRare] = "Super Rare";
rarityStrings[Rarity.UberRare] = "Uber Rare";


export class Cat implements ICat {
    rarityString: string;

    constructor(public id: number, public name: string, public rarity: Rarity) {
        this.name = name;
        this.rarity = rarity;
        this.rarityString = rarityStrings[this.rarity];
    }
}
