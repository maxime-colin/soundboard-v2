import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BoardService } from "../board.service";
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';


export class Board {
  public tiles : any[];
}

@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.css']
})
export class BoardDetailComponent implements OnInit {
  private board;
  private tiles;

  constructor(
      private route: ActivatedRoute,
      private boardService: BoardService
  ) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.loadBoard(params['boardId']);
    });
  }

  private loadBoard(boardId: string) {
    this.board = this.boardService.getBoardById(boardId);
  }

  private boardLoaded(board:Board) {
      this.tiles = Object.keys(board.tiles).map(key => board.tiles[key]);
      console.log(this.tiles);
  }

}
