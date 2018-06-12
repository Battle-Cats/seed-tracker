import { Component, OnInit } from '@angular/core';
import { IGachaSet } from "../../interfaces/IGachaSet";
import { CatSetService } from "../../services/cat-set.service";

@Component({
  selector: 'app-cat-sets',
  templateUrl: './cat-sets.component.html',
  styleUrls: ['./cat-sets.component.css']
})
export class CatSetsComponent implements OnInit {
  catSets: IGachaSet[];
  selectedSet: IGachaSet;

  constructor(private catSetService: CatSetService) { 
    this.catSetService.getSets().subscribe(s => {this.catSets = s; console.log(s)});
  }

  ngOnInit() {
  }

  onSelect(set: IGachaSet) {
    this.selectedSet = set;
  }
}
