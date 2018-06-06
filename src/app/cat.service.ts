import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {ICat, Cat} from './models/dataTypes';


@Injectable({
  providedIn: 'root'
})
export class CatService {
  private dbString = "assets/cats.json";

  constructor(private http: HttpClient) {
  }

  getCats(): Observable<ICat[]> {
    return this.http.get<Cat[]>(this.dbString)
    .pipe(map(cats => {
      let newCats: Cat[] = [];
      cats.forEach(c => newCats.push(new Cat(c.id, c.name, c.rarity)));
      return newCats;
    }));
  }
}
