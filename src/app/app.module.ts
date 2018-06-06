import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { CatsComponent } from './cats/cats.component';
import { CatSetsComponent } from './cat-sets/cat-sets.component';

@NgModule({
  declarations: [
    AppComponent,
    CatsComponent,
    CatSetsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
