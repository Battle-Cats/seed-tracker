import { Injectable } from '@angular/core';
import { ISeedGenerator } from '../interfaces/ISeedGenerator';
import { ITrackManager } from '../interfaces/ITrackManager';
import { SeedGenerator } from '../models/SeedGenerator';
import { TrackManager } from '../models/TrackManager';
import { CatSetService } from './cat-set.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { IGachaSet } from '../interfaces/IGachaSet';
import { LocalStringItemStorage, LocalItemStorage, LocalNumberItemStorage } from '../models/LocalItemStorage';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  private seedGenerator: ISeedGenerator;
  private seedStorage: LocalItemStorage<number> = new LocalNumberItemStorage("battlecats.seed", 0);
  private savedRollStorage: LocalItemStorage<string> = new LocalStringItemStorage("battlecats.savedRoll", "");
  private readySubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private selectedSetStorage: LocalItemStorage<IGachaSet>;

  public trackManager: ITrackManager;
  public seed: Observable<number> = this.seedStorage.asObservable();
  public isReady: Observable<boolean> = this.readySubject.asObservable();
  public savedRoll: Observable<string> = this.savedRollStorage.asObservable();
  public selectedSet: Observable<IGachaSet>;

  constructor(public catSetService: CatSetService) { 
    let seed = this.seedStorage.fetch();
    let savedRoll = this.savedRollStorage.fetch();
    if (savedRoll === "") {
      this.savedRollStorage.update("A1");
    }
    this.seedGenerator = new SeedGenerator(seed);
    this.selectedSetStorage = new LocalItemStorage<IGachaSet>("battlecats.selectedGacha", null, v => v.name, 
                                                              gachaName => this.gachaNameToGacha(gachaName));
    this.selectedSet = this.selectedSetStorage.asObservable();

    catSetService.getSets().subscribe(sets => {
      this.trackManager = new TrackManager(this.seedGenerator, sets);
      this.addRows(500);
      this.selectedSetStorage.fetch();
      this.readySubject.next(true);
    });
  }

  addRows(count: number = 100) {
    if (this.trackManager === null)
      return;
    this.trackManager.addRolls(count);
  }

  updateSeed(seed: number) {
    if (this.trackManager === null) 
      return;
    this.seedStorage.update(seed);
    this.trackManager.updateSeed(seed);
  }

  updateSavedRoll(roll: string) {
    this.savedRollStorage.update(roll);
  }

  setSelectedGacha(set: IGachaSet) {
    this.selectedSetStorage.update(set);
  }

  private gachaNameToGacha(gachaName: string): IGachaSet {
    let gachaIndex = this.trackManager.gachas.findIndex(s => s.name == gachaName);
    if (gachaIndex < 0)
      gachaIndex = 0;

    return this.trackManager.gachas[gachaIndex];
  }
}
