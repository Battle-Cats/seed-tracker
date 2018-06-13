import { Component, OnInit } from '@angular/core';
import { TrackService } from '../../services/track.service';
import { IGachaSet } from '../../interfaces/IGachaSet';

@Component({
  selector: 'app-set-selector',
  templateUrl: './set-selector.component.html',
  styleUrls: ['./set-selector.component.css']
})
export class SetSelectorComponent implements OnInit {
  public selectedGacha: IGachaSet = null;

  constructor(public trackService: TrackService) { }

  ngOnInit() {
    this.trackService.selectedSet.subscribe(set => this.selectedGacha = set);
  }

  onSelectedGachaChanged(selectedGacha: IGachaSet) {
    this.trackService.setSelectedGacha(selectedGacha);
  }
}
