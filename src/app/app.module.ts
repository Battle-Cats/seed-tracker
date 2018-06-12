import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { CatsComponent } from './components/cats/cats.component';
import { CatSetsComponent } from './components/cat-sets/cat-sets.component';
import { TrackComponent } from './components/track/track.component';
import { SeedComponent } from './components/seed/seed.component';
import { SingleTrackComponent } from './components/single-track/single-track.component';

@NgModule({
  declarations: [
    AppComponent,
    CatsComponent,
    CatSetsComponent,
    TrackComponent,
    SeedComponent,
    SingleTrackComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
