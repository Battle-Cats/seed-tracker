import { Injectable } from '@angular/core';
import { ISeedGenerator } from '../interfaces/ISeedGenerator';
import { ITrackManager } from '../interfaces/ITrackManager';
import { SeedGenerator } from '../models/SeedGenerator';
import { TrackManager } from '../models/TrackManager';
import { CatSetService } from './cat-set.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  private seedGenerator: ISeedGenerator;
  private seedSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private readySubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private seedKey = "battlecats.seed";
  public seed: Observable<number> = this.seedSubject.asObservable();
  public trackManager: ITrackManager;
  public isReady: Observable<boolean> = this.readySubject.asObservable();


  constructor(public catSetService: CatSetService) { 
    let seed = this.fetchSeed();
    this.seedGenerator = new SeedGenerator(seed);
    this.seedSubject.next(seed);
    catSetService.getSets().subscribe(sets => {
      this.trackManager = new TrackManager(this.seedGenerator, sets);
      this.addRows();
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

  private fetchSeed(): number {
    return +localStorage.getItem(this.seedKey);
  }
}
