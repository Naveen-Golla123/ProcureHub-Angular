import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-supplier-lot-card',
  templateUrl: './supplier-lot-card.component.html',
  styleUrls: ['./supplier-lot-card.component.scss']
})
export class SupplierLotCardComponent {
  @Input('config') config:any;
}
