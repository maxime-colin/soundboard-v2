import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export class ToolbarItem {
  public title: string;
  public link: any[];
}

@Injectable()
export class ToolbarService {

  private itemsSource = new BehaviorSubject<ToolbarItem[]>([]);

  public items = this.itemsSource.asObservable();

  public showItems(items: ToolbarItem[]) {
    this.itemsSource.next(items);
  }

}

