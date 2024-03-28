import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierLiveComponent } from './supplier-live.component';
import { Route, RouterModule } from '@angular/router';
import { SupplierLotCardComponent } from './supplier-lot-card/supplier-lot-card.component';
import { BidHeaderComponent } from './bid-header/bid-header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

const routes: Route [] = [
  {
    path: '',
    component: SupplierLiveComponent
  }
]

@NgModule({
  declarations: [
    SupplierLiveComponent,
    SupplierLotCardComponent,
    BidHeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    AgGridModule,
  ], 
  exports: [RouterModule]
})
export class SupplierLiveModule { }
