import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { BoardService } from "../board.service";
import { Board } from "../common/board";
import { FileDatastore } from "../common/file-datastore";


@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.scss']
})
export class BoardDetailComponent implements OnInit {
  private board;
  private tiles;

  constructor(
      private route: ActivatedRoute,
      private boardService: BoardService,
      private fileDataStore: FileDatastore
  ) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.loadBoard(params['boardId']);
    });
  }

  private loadBoard(boardId: string) {
    this.boardService.getBoardById(boardId).subscribe(board => {
  
      // Typing
      board.cells = board.tiles;

      // Load audio
      // @todo : Gérer le chargement ailleurs
      _.each(board.cells, (cell) => {
    
        cell.audio = cell.audio.replace('store/', 'audio-store/') + '.mp3';
        cell.audio = cell.audio.replace('http://', 'https://');

        this.fileDataStore.get(cell.audio).subscribe((data) => {
          cell.audioData = data;
          cell.audioLoaded = true;
        });
      });
  
      this.board = board;
      console.log('Board received', board);
    });
  }

}
