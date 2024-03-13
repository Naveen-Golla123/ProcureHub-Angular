import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { LotItemComponent } from './lot-item/lot-item.component';
import { EventService } from 'src/shared/services/EventService.service';
import { FormsModule } from '@angular/forms';
import { LotService } from 'src/shared/services/LotService.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SupplierRepositoryComponent } from './supplier-repository/supplier-repository.component';
import { SupplierService } from 'src/shared/services/SupplierService.service';

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
    LotItemComponent,
    SupplierRepositoryComponent
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
    MatDialogModule,
    FormsModule
  ],
  exports:[
    RouterModule
  ],
  providers: [EventService, LotService, SupplierService,{
    provide: MatDialogRef,
    useValue: {}
  },],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CreateAuctionModule { }

