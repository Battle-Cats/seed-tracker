import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { CatsComponent } from './components/cats/cats.component';
import { CatSetsComponent } from './components/cat-sets/cat-sets.component';
import { TrackComponent } from './components/track/track.component';
import { SeedComponent } from './components/seed/seed.component';
import { SingleTrackComponent } from './components/single-track/single-track.component';
import { SetSelectorComponent } from './components/set-selector/set-selector.component';

const appRoutes: Routes = [

  { path: 'track', component: TrackComponent },
  { path: 'cat-sets', component: CatSetsComponent },
  { path: '', redirectTo: '/track', pathMatch: 'full' },
  { path: '**', redirectTo: '/track' }
]

@NgModule({
  declarations: [
    AppComponent,
    CatsComponent,
    CatSetsComponent,
    TrackComponent,
    SeedComponent,
    SingleTrackComponent,
    SetSelectorComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
