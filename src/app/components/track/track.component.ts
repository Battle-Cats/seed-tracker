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
  private selectedGachaKey = "battlecats.selectedGacha";

  constructor(public trackService: TrackService) { }

  ngOnInit() {
    this.trackService.catSetService.getSets().subscribe(sets => {
      if (this.selectedGacha === null)
        this.selectedGacha = this.fetchSelectedGacha();
    });
  }

  addRows(count: number = 100) {
    console.log("Adding rows")
    this.trackService.addRows(count);
    console.log(this.trackService.trackManager);
  }

  onSelectedGachaChanged(selectedGacha: IGachaSet) {
    this.saveSelectedGacha(selectedGacha);
  }

  private fetchSelectedGacha(): IGachaSet {
    let gachaName = localStorage.getItem(this.selectedGachaKey);
    let gachaIndex = this.trackService.trackManager.gachas.findIndex(s => s.name == gachaName);
    if (gachaIndex < 0)
      gachaIndex = 0;

    return this.trackService.trackManager.gachas[gachaIndex];
  }

  private saveSelectedGacha(set: IGachaSet) {
    localStorage.setItem(this.selectedGachaKey, set.name);
  }
}
