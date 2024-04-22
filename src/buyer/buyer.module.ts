import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyerHomeComponent } from './buyer-home/buyer-home.component';
import { RouterModule, Routes } from '@angular/router';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';
const routes: Routes = [
  {
    path: '',
    component: BuyerHomeComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../buyer/dashboard/dashboard.module').then(x => x.DashboardModule),
        outlet: "buyerHome"
      },
      {
        path: 'createauction',
        loadChildren: () => import('./create-auction/create-auction.module').then(x => x.CreateAuctionModule),
        outlet: "buyerHome"
      },
      {
        path: 'bidsList',
        loadChildren: () => import('./bit-list/bit-list.module').then(m=>m.BitListModule),
        outlet: "buyerHome"
      },
      {
        path: 'supplierList',
        loadChildren: () => import('./supplier-list/supplier-list.module').then(m=>m.SupplierListModule),
        outlet: "buyerHome"
      },
      {
        path: 'settings',
        loadChildren: ()=> import('./settings/setting.module').then(m=>m.SettingModule),
        outlet: "buyerHome"
      }
    ]
  }
];

@NgModule({
  declarations: [
    BuyerHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class BuyerModule { }
