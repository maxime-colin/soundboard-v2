import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BoardService } from '../services/board.service';
import { ToolbarService } from '../header/toolbar.service';

@Component({
	selector: 'app-board-edit',
	templateUrl: './board-edit.component.html',
	styleUrls: [ './board-edit.component.scss' ]
})
export class BoardEditComponent implements OnInit {

	private board;
	private tiles;

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
					title: 'Back',
					link: [ '/board', params[ 'boardId' ] ]
				}
			]);
		});
	}

	ngOnDestroy() {
		this.toolbarService.showItems([]);
	}

	public addTile() {
		console.log('Add');
		this.boardService.addTile(this.board, {
			title: 'test',
			audio:'',
			image: ''
		});
	}

	/**
	 * Load board
	 * @param boardId
	 */
	private loadBoard(boardId: string) {
		this.boardService.getBoardById(boardId).subscribe(board => {
			this.board = board;
		});
	}

}
