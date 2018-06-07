import { ITrackManager } from "../interfaces/ITrackManager";
import { Track } from "./Track";
import { ITrack } from "../interfaces/ITrack";
import { IGachaSet } from "../interfaces/IGachaSet";
import { ISeedGenerator } from "../interfaces/ISeedGenerator";

export class TrackManager implements ITrackManager {
    trackA: ITrack;
    trackB: ITrack;
    private lastSeed: number = 0;
    constructor(private seedGenerator: ISeedGenerator, private gachas: IGachaSet[]) {
        this.trackA = new Track("A", gachas);
        this.trackB = new Track("B", gachas);
    }
    updateSeed(seed: number) {
        let currentRollCount = this.trackA.rolls.length;
        this.seedGenerator.reset(seed);
        this.trackA.clear();
        this.trackB.clear();
        this.addRolls(currentRollCount);
    }
    addRolls(count: number) {
        let initSeed = this.seedGenerator.currentSeed;
        let seeds = this.seedGenerator.generate(count * 2);
        seeds.unshift(initSeed);
        for (let i = 0; i < seeds.length - 2; i += 2) {
            this.trackA.roll(seeds[i], seeds[i + 1], seeds[i]);
            this.trackB.roll(seeds[i + 1], seeds[i + 2], seeds[i + 1]);
        }
    }
}
