import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BoardService } from '../services/board.service';
import { ToolbarService } from '../header/toolbar.service';


@Component({
	selector: 'app-board-detail',
	templateUrl: './board-detail.component.html',
	styleUrls: [ './board-detail.component.scss' ]
})
export class BoardDetailComponent implements OnInit {

	private board;

	/**
	 * @param route
	 * @param boardService
	 * @param toolbarService
	 */
	constructor(private route: ActivatedRoute,
	            private boardService: BoardService,
	            private toolbarService: ToolbarService) {
	}

	/**
	 * On init
	 */
	ngOnInit() {
		this.route.params.forEach((params: Params) => {
			this.loadBoard(params[ 'boardId' ]);
			this.toolbarService.showItems([
				{
					title: 'Edit',
					link: [ '/board', params[ 'boardId' ], 'edit' ]
				}
			]);
		});
	}

	ngOnDestroy() {
		this.toolbarService.showItems([]);
	}

	/**
	 * Load board
	 * @param boardId
	 */
	private loadBoard(boardId: string) {
		this.boardService.getBoardById(boardId).subscribe(board => {
			this.board = board;
			console.log('Board received', board);
		});
	}

}
