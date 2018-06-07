import { ITrack } from "../interfaces/ITrack";

export interface ITrackManager {
    trackA: ITrack;
    trackB: ITrack;
    updateSeed(seed: number);
    addRolls(count: number);
}
