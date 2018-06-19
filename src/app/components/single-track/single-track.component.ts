import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { ITrack } from '../../interfaces/ITrack';
import { Rarity } from '../../enums';
import { IGachaSet } from '../../interfaces/IGachaSet';
import { IGachaRoll } from '../../interfaces/IGachaRoll';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-single-track',
  templateUrl: './single-track.component.html',
  styleUrls: ['./single-track.component.css'],
})
export class SingleTrackComponent implements OnInit {
  @Input() track: ITrack;
  @Input() garUberOffset: number;
  @Input() selectedGacha: IGachaSet;
  @Input() savedRollId: string;
  @Output() savedRollUpdated = new EventEmitter<string>();

  private rarityClasses : {[rarity: number]: string; } = {};
  private chRef: ChangeDetectorRef;
  public nextTrackId: string;
  public nextTrackRollOffset: number;
  public currentHash: string;
  public fragment: string;

  constructor(private route: ActivatedRoute, chRef: ChangeDetectorRef) { 
    this.rarityClasses[Rarity.NonGacha] = "nonGacha";
    this.rarityClasses[Rarity.Rare] = "rare";
    this.rarityClasses[Rarity.SuperRare] = "superRare";
    this.rarityClasses[Rarity.UberRare] = "uberRare";
    this.chRef = chRef;
  }

  ngOnInit() {
    if (this.track.id == "A") {
      this.nextTrackId = "B";
      this.nextTrackRollOffset = 0;
    }
    else {
      this.nextTrackId = "A";
      this.nextTrackRollOffset = 1;
    }
  }

  ngAfterViewInit(): void {
    this.route.fragment.subscribe(f => {
      if (this.fragment === f) return;
      this.fragment = f;
      this.chRef.detectChanges();
      try {
        let fragObj = document.querySelector(`#${this.fragment}`);
        fragObj.scrollIntoView(true);
        window.scrollBy(0, -50);
      }
      catch (e) {
      }
    });
  }

  scoreClass(roll: IGachaRoll): string {
    if (roll.allUbers) return "uberRare";
    if (roll.hasUbers) return "possibleUber";
    return "";
  }

  saveRoll(roll: IGachaRoll) {
    console.log(`updating saved roll to ${roll.id}`)
    this.savedRollUpdated.emit(roll.id);
  }
  
  rarityClass(rarity: Rarity): string {
    return this.rarityClasses[rarity];
  }
}
