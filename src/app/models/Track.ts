import { ITrack } from "../interfaces/ITrack";
import { IGachaRoll } from "../interfaces/IGachaRoll";
import { IGachaSet } from "../interfaces/IGachaSet";
import { GachaRoll } from "./GachaRoll";

export class Track implements ITrack {
    rolls: IGachaRoll[] = [];
    
    constructor(private id: string, private gachas: IGachaSet[]) {
    }

    roll(scoreSeed: number, slotSeed: number, guaranteedUberSeed: number) {
        let id = `${this.id}${this.rolls.length}`;
        this.rolls.push(new GachaRoll(this.gachas, id, scoreSeed, slotSeed, guaranteedUberSeed));
    }
    
    clear() {
        this.rolls = [];
    }
}
