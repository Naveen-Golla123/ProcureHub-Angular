import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierAuctionComponent } from './supplier-auction.component';
import { RouterModule, Routes } from '@angular/router';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { EventService } from 'src/shared/services/EventService.service';


const routes: Routes = [
  {
    path : "",
    component : SupplierAuctionComponent
  }
]

@NgModule({
  declarations: [
    SupplierAuctionComponent
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
  ],
  exports: [RouterModule],
  providers: [EventService]
})
export class SupplierAuctionsModule { }
