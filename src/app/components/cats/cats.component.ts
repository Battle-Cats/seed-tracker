import { Component, OnInit } from '@angular/core';
import {ICat} from "../../interfaces/ICat";
import {CatService} from "../../services/cat.service";

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.css']
})
export class CatsComponent implements OnInit {
  cats: ICat[];
  selectedCat: ICat;

  constructor(private catService: CatService) { }

  ngOnInit() {
    this.getCats();
  }

  getCats() {
    this.catService.getCats().subscribe(cats => this.cats = cats);
  }

  onSelect(cat: ICat): void {
    this.selectedCat = cat;
  }
}
