import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AppComponent } from "./app.component";
import { SidemenuComponent } from "./sidemenu/sidemenu.component";
import { BoardListComponent } from "./board-list/board-list.component";
import { AngularFireModule } from "angularfire2";
import { BoardService } from "./board.service";
import { SoundboardRoutingModule } from "./app-routing.module";
import { BoardDetailComponent } from "./board-detail/board-detail.component";
import { HomeComponent } from "./home/home.component";
import { ValuesPipe } from "./values.pipe";
import { VoronoiComponent } from "./voronoi/voronoi.component";
import { AudioPlayerFactory } from "./audio/audio-player-factory";
import { AudioService } from "./audio/audio-service";
import { PointerEventFactory } from "./pointer-event/pointer-event-factory";
import * as _ from "lodash";

// Don't remove !
import * as firebase from 'firebase';
import { FileDatastore } from "./common/file-datastore";


// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyAMWQaVFi1zEX7Jwxg0ofnApfACurWMEg4",
  authDomain: "soundboard-v2.firebaseapp.com",
  databaseURL: "https://soundboard-v2.firebaseio.com",
  storageBucket: "",
  messagingSenderId: "1062302939902"
};


@NgModule({
  declarations: [
    AppComponent,
    SidemenuComponent,
    BoardListComponent,
    BoardDetailComponent,
    HomeComponent,
    ValuesPipe,
    VoronoiComponent
  ],
  imports: [
    SoundboardRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [
      BoardService,
      AudioPlayerFactory,
      AudioService,
      PointerEventFactory,
      FileDatastore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
