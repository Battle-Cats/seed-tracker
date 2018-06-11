import { Component, OnInit, Input } from '@angular/core';
import { ITrack } from '../../interfaces/ITrack';
import { Rarity } from '../../enums';
import { IGachaSet } from '../../interfaces/IGachaSet';

@Component({
  selector: 'app-single-track',
  templateUrl: './single-track.component.html',
  styleUrls: ['./single-track.component.css']
})
export class SingleTrackComponent implements OnInit {
  @Input() track: ITrack;
  @Input() garUberOffset: number;
  @Input() selectedGacha: IGachaSet;

  private rarityClasses : {[rarity: number]: string; } = {};

  constructor() { 
    this.rarityClasses[Rarity.NonGacha] = "nonGacha";
    this.rarityClasses[Rarity.Rare] = "rare";
    this.rarityClasses[Rarity.SuperRare] = "superRare";
    this.rarityClasses[Rarity.UberRare] = "uberRare";
  }

  ngOnInit() {
  }
  
  rarityClass(rarity: Rarity): string {
    return this.rarityClasses[rarity];
  }
}
