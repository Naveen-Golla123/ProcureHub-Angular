import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGaurd } from '../shared/services/AuthGaurd';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGaurd],
    component: AppComponent
    //loadChildren: ()=> load base page
  },
  {
    path: "buyerHome",
    canActivate: [AuthGaurd],
    loadChildren: ()=> import('../buyer/buyer.module').then(m=>m.BuyerModule)
  },
  {
    path: "supplierHome",
    canActivate: [AuthGaurd],
    loadChildren: ()=> import('../supplier/supplier.module').then(m=>m.SupplierModule)
  },
  {
    path: 'auth',
    loadChildren: ()=> import('../shared/login/login.module').then(m=> m.LoginModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
