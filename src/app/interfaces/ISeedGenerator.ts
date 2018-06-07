export interface ISeedGenerator {
    readonly rootSeed: number;
    readonly currentSeed: number;
    generate(count?: number): number[];
    reset(seed?: number): void;
}