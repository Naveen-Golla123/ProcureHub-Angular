import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGaurd } from '../shared/services/AuthGaurd';
import { AppComponent } from './app.component';
import { BuyerGaurd } from 'src/shared/services/BuyerGaurd';
import { SupplierGaurd } from 'src/shared/services/SupplierGaurd';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGaurd],
    component: AppComponent
    //loadChildren: ()=> load base page
  },
  {
    path: "buyerHome",
    canActivate: [AuthGaurd, BuyerGaurd],
    loadChildren: ()=> import('../buyer/buyer.module').then(m=>m.BuyerModule)
  },
  {
    path: "supplierHome",
    canActivate: [AuthGaurd, SupplierGaurd],
    loadChildren: ()=> import('../supplier/supplier.module').then(m=>m.SupplierModule)
  },
  {
    path: 'auth',
    loadChildren: ()=> import('../shared/login/login.module').then(m=> m.LoginModule)
  },
  {
    path: "auction",
    canActivate: [AuthGaurd],
    loadChildren: ()=>import('../shared/auction/auction.module').then(m=>m.AuctionModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
