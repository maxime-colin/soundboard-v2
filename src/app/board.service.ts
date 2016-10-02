import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Observable } from "rxjs/Observable";

@Injectable()
export class BoardService {

  constructor(
      private af: AngularFire
  ) { }

  public get() {
    return this.af.database.list('/boards-overview');
  }
  
  
  public getBoardById(boardId: string): FirebaseObjectObservable<any[]>{
    console.log('/boards/' + boardId);
    return this.af.database.object('/boards/' + boardId);
    
    /*
    return Observable.create(observer => {
      var Firebase = require('firebase');
      
      // Get a database reference to our posts
      var ref = new Firebase("https://mc-pad-test.firebaseio.com/boards/" + boardId);
      
      // Attach an asynchronous callback to read the data at our posts reference
      ref.on("value", (snapshot) => {
        
        
        var rawObj= snapshot.val();
        
        // Typing
        rawObj.cells = rawObj.tiles;
        var board = <Board>rawObj;
        
        // Load audio
        // @todo : Gérer le chargement ailleurs
        _.each(board.cells, (cell) => {
          
          cell.audio = cell.audio.replace('store/', 'audio-store/') + '.mp3';
          
          this.fileDataStore.get(cell.audio).subscribe((data) => {
            cell.audioData = data;
            cell.audioLoaded = true;
          });
        });
        
        observer.next(board);
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
      
      
    });
    
    */
  }
}
