import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAuctionComponent } from './create-auction.component';
import { RouterModule, Routes } from '@angular/router';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatFormFieldModule  }  from "@angular/material/form-field"
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { SupplierComponent } from './supplier/supplier.component';
import { LotGridComponent } from './lot-grid/lot-grid.component';
import { LotDetailsComponent } from './lot-details/lot-details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LotItemComponent } from './lot-item/lot-item.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CreateAuctionComponent
  }
]

@NgModule({
  declarations: [
    CreateAuctionComponent,
    SupplierComponent,
    LotGridComponent,
    LotDetailsComponent,
    LotItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    UiComponentsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule
  ],
  exports:[
    RouterModule
  ]
})
export class CreateAuctionModule { }

