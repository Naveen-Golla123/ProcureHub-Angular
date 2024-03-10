import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BitListComponent } from './bit-list.component';
import { RouterModule, Routes } from '@angular/router';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';
import { EventService } from 'src/shared/services/EventService.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: BitListComponent
  }
];

@NgModule({
  declarations: [
    BitListComponent
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
  providers: [EventService]
})
export class BitListModule { }
