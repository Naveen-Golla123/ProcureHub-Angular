import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-supplier-live',
  templateUrl: './supplier-live.component.html',
  styleUrls: ['./supplier-live.component.scss']
})
export class SupplierLiveComponent {
  lots: any[] = [1,2,34,4,56,67,8,9,0,7,6,54,7,9,7,6,56]

  rowData = [
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ];
 
  colDefs: ColDef[] = [
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" }
  ];
} 
