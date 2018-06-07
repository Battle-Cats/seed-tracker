import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { CatsComponent } from './components/cats/cats.component';
import { CatSetsComponent } from './components/cat-sets/cat-sets.component';
import { TrackComponent } from './components/track/track.component';
import { SeedComponent } from './components/seed/seed.component';

@NgModule({
  declarations: [
    AppComponent,
    CatsComponent,
    CatSetsComponent,
    TrackComponent,
    SeedComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
