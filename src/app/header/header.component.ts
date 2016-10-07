import { Component, OnInit } from '@angular/core';
import { ToolbarService, ToolbarItem } from './toolbar.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: [ './header.component.scss' ]
})
export class HeaderComponent implements OnInit {

	private toolbarItemsSubscription: Subscription;
	private toolbarItems: ToolbarItem[];

	constructor(private toolbarService: ToolbarService) {
	}


	ngOnInit() {
		this.toolbarItemsSubscription = this.toolbarService.items.subscribe(items => {
			this.toolbarItems = items;
		})
	}

}
