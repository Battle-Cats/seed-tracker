import { Component, OnInit } from '@angular/core';
import { TrackService } from '../../services/track.service';

@Component({
  selector: 'app-seed',
  templateUrl: './seed.component.html',
  styleUrls: ['./seed.component.css']
})
export class SeedComponent implements OnInit {
  public seed = 0;

  constructor(private trackService: TrackService) { }

  ngOnInit() {
    this.trackService.seed.subscribe(seed => this.seed = seed);
  }

  updateSeed() {
    if (this.seed === null)
      return;
    console.log(`Updated seed to ${this.seed}`);
    this.trackService.updateSeed(this.seed);
    if (this.trackService.trackManager.trackA.rolls.length === 0) {
      this.trackService.addRows(100);
    }
    console.log(this.trackService.trackManager);
  }
}
