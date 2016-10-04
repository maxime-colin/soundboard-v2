import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class BoardService {

  constructor(
      private af: AngularFire
  ) { }

  public get() {
    return this.af.database.list('/boards-overview');
  }
  
  
  public getBoardById(boardId: string): FirebaseObjectObservable<any>{
    return this.af.database.object('/boards/' + boardId);
  }
}
