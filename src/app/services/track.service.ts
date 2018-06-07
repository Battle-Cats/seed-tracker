import { Injectable } from '@angular/core';
import { ISeedGenerator } from '../interfaces/ISeedGenerator';
import { ITrackManager } from '../interfaces/ITrackManager';
import { SeedGenerator } from '../models/SeedGenerator';
import { TrackManager } from '../models/TrackManager';
import { CatSetService } from './cat-set.service';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  public trackManager: ITrackManager;
  private seedGenerator: ISeedGenerator;

  constructor(catSetService: CatSetService) { 
    this.seedGenerator = new SeedGenerator(0);
    catSetService.getSets().subscribe(sets => this.trackManager = new TrackManager(this.seedGenerator, sets));
  }

  addRows(count: number = 100) {
    if (this.trackManager === null)
      return;
    this.trackManager.addRolls(count);
  }

  updateSeed(seed: number) {
    if (this.trackManager === null) 
      return;
    this.trackManager.updateSeed(seed);
  }
}
