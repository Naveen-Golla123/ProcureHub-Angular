import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lot-item',
  templateUrl: './lot-item.component.html',
  styleUrls: ['./lot-item.component.scss']
})
export class LotItemComponent {
  @Input("config") config:any;
}
