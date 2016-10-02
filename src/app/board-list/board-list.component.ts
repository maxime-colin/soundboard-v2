import { Component, OnInit } from '@angular/core';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss']
})
export class BoardListComponent implements OnInit {
  private boards;

  constructor(
      private boardService: BoardService
  ) { }

  ngOnInit() {
    this.boards = this.boardService.get();
  }


}
