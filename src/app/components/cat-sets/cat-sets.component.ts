import { Component, OnInit } from '@angular/core';
import { IGachaSet } from "../../interfaces/IGachaSet";
import { TrackService } from '../../services/track.service';

@Component({
  selector: 'app-cat-sets',
  templateUrl: './cat-sets.component.html',
  styleUrls: ['./cat-sets.component.css']
})
export class CatSetsComponent implements OnInit {
  catSets: IGachaSet[];
  selectedSet: IGachaSet;

  constructor(private trackService: TrackService) {}

  ngOnInit() {
    this.trackService.selectedSet.subscribe(set => this.selectedSet = set); 
  }
}
