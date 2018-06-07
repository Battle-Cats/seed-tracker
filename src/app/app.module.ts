import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { CatsComponent } from './components/cats/cats.component';
import { CatSetsComponent } from './components/cat-sets/cat-sets.component';

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
