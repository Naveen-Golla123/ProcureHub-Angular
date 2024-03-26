import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuctionComponent } from './auction.component';
import { AuctionHeaderComponent } from './auction-header/auction-header.component';
import { Route, RouterModule } from '@angular/router';


const routes: Route[] = [{
  path: '',
  component: AuctionComponent,
  children : [
    {
      path: 'supplierAuction',
      loadChildren: ()=> import('../../supplier/supplier-live/supplier-live.module').then(x=>x.SupplierLiveModule),
      outlet: "liveAuction"
    },
    {
      path: 'buyerAuction',
      loadChildren: ()=> import('../../buyer/buyer-live/buyer-live.module').then(x=>x.BuyerLiveModule),
      outlet: "liveAuction"
    }
  ]
}]

@NgModule({
  declarations: [
    AuctionComponent,
    AuctionHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class AuctionModule { }
