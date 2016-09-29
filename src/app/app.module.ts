import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { BoardListComponent } from './board-list/board-list.component';
import { AngularFireModule } from 'angularfire2';

// Don't remove !
import * as firebase from 'firebase';
import { BoardService } from './board.service';
import { RouterModule } from '@angular/router';
import { SoundboardRoutingModule } from './app-routing.module';
import { BoardDetailComponent } from './board-detail/board-detail.component';
import { HomeComponent } from './home/home.component';


// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyAwd-zTltQqyljJDcgcIefkC2DGrICDKJA",
  authDomain: "mc-pad-test.firebaseapp.com",
  databaseURL: "https://mc-pad-test.firebaseio.com",
  storageBucket: "mc-pad-test.appspot.com",
  messagingSenderId: "969572079029"
};


@NgModule({
  declarations: [
    AppComponent,
    SidemenuComponent,
    BoardListComponent,
    BoardDetailComponent,
    HomeComponent
  ],
  imports: [
    SoundboardRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [
      BoardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
