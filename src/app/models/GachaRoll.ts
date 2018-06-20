import { IGachaRoll, ICatSelection, IGachaCatRoll } from "../interfaces/IGachaRoll";
import { IGachaSet } from "../interfaces/IGachaSet";
import { ICat } from "../interfaces/ICat";
import { Rarity } from "../enums";



export class GachaRoll implements IGachaRoll {
    id: string;
    scoreSeed: number;
    slotSeed: number;
    guaranteedUberSeed: number;
    score: number;
    rolledCats: ICatSelection[] = [];
    hasUbers: boolean = false;
    allUbers: boolean = false;
    showDetails: boolean = false;

    constructor(gachaSets: IGachaSet[], id: string, scoreSeed: number, slotSeed: number, guaranteedUberSeed: number) {
        this.id = id;
        this.scoreSeed = scoreSeed;
        this.slotSeed = slotSeed;
        this.guaranteedUberSeed = guaranteedUberSeed;
        this.score = Math.abs(scoreSeed) % 10000;
        this.hasUbers = false;
        this.allUbers = true;
        
        for (let i = 0; i < gachaSets.length; i++) {
            let gacha = gachaSets[i];
            let catSelection = this.getCatSelection(gacha);
            this.rolledCats[gacha.name] = catSelection;

            if (catSelection.cat.rarity === Rarity.UberRare) {
                this.hasUbers = true;
            }
            else {
                this.allUbers = false;
            }
        }
    }

    private getCatSelection(gacha: IGachaSet): IGachaCatRoll {
        let cats: ReadonlyArray<ICat>;
        if (this.score > gacha.uberRareThreshold) {
            cats = gacha.uberRareCats;
        }
        else if (this.score > gacha.superAndUberRareThreshold) {
            cats = gacha.superRareCats;
        }
        else {
            cats = gacha.rareCats;
        }

        let catSlot = Math.abs(this.slotSeed) % cats.length;
        let cat = cats[catSlot];

        let garUberSlot = Math.abs(this.guaranteedUberSeed) % gacha.uberRareCats.length;
        let garUberCat = gacha.uberRareCats[garUberSlot];

        let catSelection: IGachaCatRoll = {
            cat: cat,
            guaranteedUber: garUberCat,
            slot: catSlot,
            guaranteedUberSlot: garUberSlot,
            gacha: gacha
        }

        return catSelection;
    }
}