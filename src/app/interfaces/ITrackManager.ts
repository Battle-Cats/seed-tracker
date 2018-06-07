import { ITrack } from "../interfaces/ITrack";
import { IGachaSet } from "./IGachaSet";

export interface ITrackManager {
    trackA: ITrack;
    trackB: ITrack;
    gachas: IGachaSet[];
    updateSeed(seed: number);
    addRolls(count: number);
}
