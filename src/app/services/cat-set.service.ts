import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { CatService } from './cat.service';
import { GachaSet, GachaJsonData} from '../models/GachaSet';
import { IGachaSet } from "../interfaces/IGachaSet";
import { ICat } from "../interfaces/ICat";


@Injectable({
  providedIn: 'root'
})
export class CatSetService {
  private dbString = "assets/cat_sets.json";

  constructor(private http: HttpClient, private catService: CatService) { }

  getSets(): Observable<IGachaSet[]> {
    console.log("Getting sets..")
    return this.catService.getCats()
      .pipe(mergeMap(cats => this.getSetData(cats)));
  }

  private getSetData(cats: ICat[]): Observable<IGachaSet[]> {
    return this.http.get<GachaJsonData[]>(this.dbString)
      .pipe(map(sets => {
        let newSets: IGachaSet[] = [];

        sets.forEach(s => newSets.push(new GachaSet(s, cats)));
        return newSets;
      }));
  }
}
