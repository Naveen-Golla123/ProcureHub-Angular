import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierDashboardComponent } from './supplier-dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SupplierDashboardComponent
  }
];

@NgModule({
  declarations: [
    SupplierDashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UiComponentsModule
  ],
  exports: [
    RouterModule
  ]
})
export class SupplierDashboardModule { }
