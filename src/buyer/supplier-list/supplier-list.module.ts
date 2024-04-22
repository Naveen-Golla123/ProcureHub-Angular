import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierListComponent } from './supplier-list.component';
import { RouterModule, Routes } from '@angular/router';
import { SettingComponent } from '../settings/setting.component';
import { MatTableModule } from '@angular/material/table';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';
import { SupplierService } from 'src/shared/services/SupplierService.service';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SupplierListComponent
  }
]

@NgModule({
  declarations: [
    SupplierListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    UiComponentsModule,
    FormsModule
  ],
  providers: [
    SupplierService
  ],
  exports: [
    RouterModule
  ]
})
export class SupplierListModule { }
