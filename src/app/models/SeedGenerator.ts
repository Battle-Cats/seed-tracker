import { ISeedGenerator } from "../interfaces/ISeedGenerator";

export class SeedGenerator implements ISeedGenerator {
    currentSeed: number;

    constructor(public rootSeed: number) {
        this.currentSeed = rootSeed;
    }

    generate(count: number = 1): number[] {
        let seeds: number[];
        seeds = [];
        for (let i = 0; i < count; i++) {
            this.currentSeed = this.getNext(this.currentSeed);
            seeds.push(this.currentSeed);
        }
        return seeds;
    }

    reset(seed?: number): void {
        if (seed) {
            this.rootSeed = seed;
        }
        this.currentSeed = this.rootSeed;
    }

    private getNext(seed: number): number {
        seed ^= seed << 13;
        seed ^= seed >> 17;
        seed ^= seed << 15;
        return seed;
    }
}