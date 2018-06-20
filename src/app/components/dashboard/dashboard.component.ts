import { Component, OnInit } from '@angular/core';
import { TrackService } from '../../services/track.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public currentRoll: string;


  constructor(public trackService: TrackService, private router: Router) { }

  ngOnInit() {
    this.trackService.savedRoll.subscribe(rollId => this.currentRoll = rollId);
  }

  navCurrentRoll() {
    console.log(`Navigating to roll ${this.currentRoll}`);
    this.router.navigateByUrl(`track#${this.currentRoll}`);
  }
}
