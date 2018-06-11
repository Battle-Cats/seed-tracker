import { IGachaRoll } from "../interfaces/IGachaRoll";

export interface ITrack {
    readonly id: string;
    rolls: IGachaRoll[];
    roll(scoreSeed: number, slotSeed: number, guaranteedUberSeed: number);
    clear();
}
