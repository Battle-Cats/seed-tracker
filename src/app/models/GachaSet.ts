import { IGachaSet } from "../interfaces/IGachaSet";
import { ICat } from "../interfaces/ICat";
import { Rarity } from "../enums";

export class GachaJsonData {
    name: string;
    uberRarePercent: number;
    superAndUberRarePercent: number;
    catIds: number[]
}

export class GachaSet implements IGachaSet {
    name: string;
    uberRarePercent: number;
    superAndUberRarePercent: number;
    uberRareThreshold: number;
    superAndUberRareThreshold: number;
    rareCats: ReadonlyArray<ICat>;
    superRareCats: ReadonlyArray<ICat>;
    uberRareCats: ReadonlyArray<ICat>;

    private rares: ICat[] = [];
    private supers: ICat[] = [];
    private ubers: ICat[] = []

    constructor(jsonData: GachaJsonData, cats: ICat[]) {
        this.name = jsonData.name;
        this.uberRarePercent = jsonData.uberRarePercent;
        this.superAndUberRarePercent = jsonData.superAndUberRarePercent;
        this.uberRareThreshold = (100 - this.uberRarePercent) * 100;
        this.superAndUberRareThreshold = (100 - this.superAndUberRarePercent) * 100;

        this.rareCats = this.rares;
        this.superRareCats = this.supers;
        this.uberRareCats = this.ubers;

        for (let i = 0; i < jsonData.catIds.length; i++) {
            const id = jsonData.catIds[i];
            let cat = cats.find(c => c.id === id);
            if (cat === null) {
                console.log(`Unable to find cat id ${id} in gacha set ${this.name}`);
            }
            else if (cat.rarity == Rarity.Rare) {
                this.rares.push(cat);
            }
            else if (cat.rarity == Rarity.SuperRare) {
                this.supers.push(cat);
            }
            else if (cat.rarity == Rarity.UberRare) {
                this.ubers.push(cat);
            }
            else {
                console.log(`unknown cat rarity ${cat.rarity} in gacha set ${this.name}`);
            }
        }
    }
}