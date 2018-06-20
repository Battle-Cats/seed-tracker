import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IGachaRoll } from '../../interfaces/IGachaRoll';

@Component({
  selector: 'app-roll-details-mini',
  templateUrl: './roll-details-mini.component.html',
  styleUrls: ['./roll-details-mini.component.css']
})
export class RollDetailsMiniComponent implements OnInit {
  @Input() roll: IGachaRoll;
  @Input() nextTrackId: string;
  @Input() nextTrackRollNumber: number;
  @Output() savedRollUpdated = new EventEmitter<IGachaRoll>();
  
  constructor() { }

  ngOnInit() {
  }

  saveRoll() {
    this.savedRollUpdated.emit(this.roll);
  }

  getGuaranteedUberNextId(): string {
    return `${this.nextTrackId}${this.nextTrackRollNumber}`;
  }
}
