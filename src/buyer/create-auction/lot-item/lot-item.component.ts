import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-lot-item',
  templateUrl: './lot-item.component.html',
  styleUrls: ['./lot-item.component.scss']
})
export class LotItemComponent {
  @Input("config") config: any;
  @Output("configChange") configChange = new EventEmitter<any>();


  onDetailChange() {
    //this.configChange.emit(this.config);
  }

  itemChanged() {
    this.configChange.emit(this.config);
  }

  deleteItem() {
    if (this.config && this.config.callback && this.config.callback.deleteItem) {
      this.config.callback.deleteItem(this.config);
    }
  }
}
