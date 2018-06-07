import { IGachaRoll } from "../interfaces/IGachaRoll";

export interface ITrack {
    rolls: IGachaRoll[];
    roll(scoreSeed: number, slotSeed: number, guaranteedUberSeed: number);
    clear();
}
