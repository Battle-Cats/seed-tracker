import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IGachaSet } from "../models/dataTypes";
import { CatSetService } from "../cat-set.service";

@Component({
  selector: 'app-cat-sets',
  templateUrl: './cat-sets.component.html',
  styleUrls: ['./cat-sets.component.css']
})
export class CatSetsComponent implements OnInit {
  catSets: IGachaSet[];
  selectedSet: IGachaSet;

  constructor(private catSetService: CatSetService) { }

  ngOnInit() {
    console.log(this.catSetService);
    this.catSetService.getSets().subscribe(s => {this.catSets = s; console.log(s)});
  }

  onSelect(set: IGachaSet) {
    this.selectedSet = set;
  }
}
