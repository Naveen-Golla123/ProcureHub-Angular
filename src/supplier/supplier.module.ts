import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierHomeComponent } from './supplier-home/supplier-home.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SupplierHomeComponent
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
  ]
})
export class SupplierModule { }
