import { Component, OnInit } from '@angular/core';
import { TrackService } from '../../services/track.service';
import { IGachaSet } from '../../interfaces/IGachaSet';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {
  public selectedGacha: IGachaSet = null;
  public garUberOffset = 10;
  public garUberDrawOptions = [10, 7];

  constructor(public trackService: TrackService) { }

  ngOnInit() {
    this.trackService.selectedSet.subscribe(set => this.selectedGacha = set);
  }

  addRows(count: number = 100) {
    console.log("Adding rows")
    this.trackService.addRows(count);
    console.log(this.trackService.trackManager);
  }
}
