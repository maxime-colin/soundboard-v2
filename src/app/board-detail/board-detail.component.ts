import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { FileDatastore } from "../common/file-datastore";
import { BoardService } from '../services/board.service';


@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.scss']
})
export class BoardDetailComponent implements OnInit {

  private board;
  private tiles;

  /**
   * @param route
   * @param boardService
   * @param fileDataStore
   */
  constructor(
      private route: ActivatedRoute,
      private boardService: BoardService,
      private fileDataStore: FileDatastore
  ) { }

  /**
   * On init
   */
  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.loadBoard(params['boardId']);
    });
  }

  /**
   * Load board
   * @param boardId
   */
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
