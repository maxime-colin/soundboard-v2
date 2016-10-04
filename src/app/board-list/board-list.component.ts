import { Component, OnInit } from '@angular/core';
import { BoardService } from '../services/board.service';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss']
})
export class BoardListComponent implements OnInit {

  private boards;

  /**
   * @param boardService
   */
  constructor(
      private boardService: BoardService
  ) { }

  /**
   * On init
   */
  ngOnInit() {
    this.boards = this.boardService.get();
  }


}
