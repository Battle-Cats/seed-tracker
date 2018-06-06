export enum Rarity {
    NonGacha = -1,
    Rare = 0,
    SuperRare = 1,
    UberRare = 2
}

var rarityStrings : {[rarity: number]: string; } = {};
rarityStrings[Rarity.NonGacha] = "Non-Gacha";
rarityStrings[Rarity.Rare] = "Rare";
rarityStrings[Rarity.SuperRare] = "Super Rare";
rarityStrings[Rarity.UberRare] = "Uber Rare";

export interface ICat {
    readonly name: string;
    readonly id: number;
    readonly rarity: Rarity;
    readonly rarityString: string;
}

export class Cat implements ICat {
    name: string;
    id: number;
    rarity: Rarity;
    rarityString: string;

    constructor(id: number, name: string, rarity: Rarity) {
        this.id = id;
        this.name = name;
        this.rarity = rarity;
        this.rarityString = rarityStrings[this.rarity]
    }
}

export interface IGachaSet {
    readonly name: string;
    readonly uberRareThreshold: number;
    readonly uberRarePercent: number
    readonly superAndUberRareThreshold: number;
    readonly superAndUberRarePercent: number;
    rareCats: ReadonlyArray<ICat>;
    superRareCats: ReadonlyArray<ICat>;
    uberRareCats: ReadonlyArray<ICat>;
}

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


export interface IGachaCatSelection {
    cat: ICat;
    guaranteedUber: ICat;
    gacha: IGachaSet;
    slot: number;
    guaranteedUberSlot: number;
}

export interface ICatSelection {
    [gachaName: string]: IGachaCatSelection;
}


export interface IGachaRoll {
    readonly id: string;
    readonly scoreSeed: number;
    readonly slotSeed: number;
    readonly guaranteedUberSeed: number;
    readonly score: number;

    rolledCats: ICatSelection[];
}


class GachaRoll implements IGachaRoll {
    id: string;
    scoreSeed: number;
    slotSeed: number;
    guaranteedUberSeed: number;
    score: number;
    rolledCats: ICatSelection[] = [];

    constructor(private gachaSets: IGachaSet[], id: string, scoreSeed: number, slotSeed: number, guaranteedUberSeed: number) {
        this.id = id;
        this.scoreSeed = scoreSeed;
        this.slotSeed = slotSeed;
        this.guaranteedUberSeed = guaranteedUberSeed;
        this.score = Math.abs(scoreSeed) % 10000;
        
        for (let i = 0; i < gachaSets.length; i++) {
            let gacha = gachaSets[i];
            this.rolledCats[gacha.name] = this.getCatSelection(gacha);
        }
    }

    private getCatSelection(gacha: IGachaSet): IGachaCatSelection {
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

        let garUberSlot = Math.abs(this.guaranteedUberSeed) & gacha.uberRareCats.length;
        let garUberCat = gacha.uberRareCats[garUberSlot];

        let catSelection: IGachaCatSelection = {
            cat: cat,
            guaranteedUber: garUberCat,
            slot: catSlot,
            guaranteedUberSlot: garUberSlot,
            gacha: gacha
        }

        return catSelection;
    }
}


export interface ITrack {
    rolls: IGachaRoll[];

    roll(scoreSeed: number, slotSeed: number, guaranteedUberSeed: number);
    clear();
}


class Track implements ITrack {
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


export interface ITrackManager {
    trackA: ITrack;
    trackB: ITrack;

    updateSeed(seed: number);
    addRolls(count: number);
}


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
            this.trackB.roll(seeds[i+1], seeds[i+2], seeds[i+1]);
        }
    }
}


export interface ISeedGenerator {
    readonly rootSeed: number;
    readonly currentSeed: number;
    generate(count?: number) : number[];
    reset(seed?: number): void;
}


export class SeedGenerator implements ISeedGenerator {
    rootSeed: number;
    currentSeed: number;

    constructor(rootSeed: number) {
        this.rootSeed = rootSeed;
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

