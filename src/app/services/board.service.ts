import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { FileDatastore } from '../common/file-datastore';
import { Board } from '../common/board';
import * as _ from "lodash";


@Injectable()
export class BoardService {
    constructor (
        private af: AngularFire,
        private fileDataStore: FileDatastore
    ) {
    }

    public get () {
        return this.af.database.list('/boards-overview');
    }


    public getBoardById (boardId: string): FirebaseObjectObservable<any> {
        const board =  this.af.database.object('/boards/' + boardId);
        console.log(board);
        return <FirebaseObjectObservable<any>> board.map(board => {
            // Typing
            board.cells = board.tiles;

            // Load audio
            // @todo : Gérer le chargement ailleurs
            _.each(board.cells, (cell) => {

                cell.audio = cell.audio.replace('store/', 'audio-store/') + '.mp3';
                cell.audio = cell.audio.replace('http://', 'https://');

                this.fileDataStore.get(cell.audio).subscribe((data) => {
                    cell.audioData   = data;
                    cell.audioLoaded = true;
                });
            });

            return board;
        });
    }

    public addTile (board: Board, tile: any) {
        let tiles = this.af.database.list('/boards/' + board.url + '/tiles');
        tiles.push(tile);
    }
}
