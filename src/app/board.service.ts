import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Injectable()
export class BoardService {

  constructor(
      private af: AngularFire
  ) { }

  public get() {
    return this.af.database.list('/boards-overview');
  }
}
