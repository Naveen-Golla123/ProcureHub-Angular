import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierHomeComponent } from './supplier-home/supplier-home.component';
import { RouterModule, Routes } from '@angular/router';
import { SupplierService } from 'src/shared/services/SupplierService.service';
import { LiveAuctionService } from 'src/shared/services/LiveAuction.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [
  {
    path: '',
    component: SupplierHomeComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./supplier-dashboard/supplier-dashboard.module').then(x => x.SupplierDashboardModule),
        outlet: "supplierHome"
      },
      {
        path: 'auctions',
        loadChildren: () => import('./supplier-auctions/supplier-auctions.module').then(m=>m.SupplierAuctionsModule),
        outlet: "supplierHome"
      },
      {
        path: 'settings',
        loadChildren: ()=> import('../buyer/settings/setting.module').then(m=>m.SettingModule),
        outlet: "supplierHome"
      }
    ]
  }
]

@NgModule({
  declarations: [
    SupplierHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [SupplierService, LiveAuctionService]
})
export class SupplierModule { }
