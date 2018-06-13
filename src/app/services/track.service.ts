import { Injectable } from '@angular/core';
import { ISeedGenerator } from '../interfaces/ISeedGenerator';
import { ITrackManager } from '../interfaces/ITrackManager';
import { SeedGenerator } from '../models/SeedGenerator';
import { TrackManager } from '../models/TrackManager';
import { CatSetService } from './cat-set.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { IGachaSet } from '../interfaces/IGachaSet';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  private seedGenerator: ISeedGenerator;
  private seedSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private readySubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private selectedSetSubject: BehaviorSubject<IGachaSet> = new BehaviorSubject<IGachaSet>(null);
  private seedKey = "battlecats.seed";
  private selectedGachaKey = "battlecats.selectedGacha";

  public seed: Observable<number> = this.seedSubject.asObservable();
  public trackManager: ITrackManager;
  public isReady: Observable<boolean> = this.readySubject.asObservable();
  public selectedSet: Observable<IGachaSet> = this.selectedSetSubject.asObservable();

  constructor(public catSetService: CatSetService) { 
    let seed = this.fetchSeed();
    this.seedGenerator = new SeedGenerator(seed);
    this.seedSubject.next(seed);
    catSetService.getSets().subscribe(sets => {
      this.trackManager = new TrackManager(this.seedGenerator, sets);
      this.addRows();
      this.setSelectedGacha(this.fetchSelectedGacha());
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
    localStorage.setItem(this.seedKey, String(seed));
    this.trackManager.updateSeed(seed);
    this.seedSubject.next(seed);
  }

  setSelectedGacha(set: IGachaSet) {
    this.saveSelectedGacha(set);
    this.selectedSetSubject.next(set);
  }

  private fetchSelectedGacha(): IGachaSet {
    let gachaName = localStorage.getItem(this.selectedGachaKey);
    let gachaIndex = this.trackManager.gachas.findIndex(s => s.name == gachaName);
    if (gachaIndex < 0)
      gachaIndex = 0;

    return this.trackManager.gachas[gachaIndex];
  }

  private saveSelectedGacha(set: IGachaSet) {
    localStorage.setItem(this.selectedGachaKey, set.name);
  }

  private fetchSeed(): number {
    return +localStorage.getItem(this.seedKey);
  }
}
