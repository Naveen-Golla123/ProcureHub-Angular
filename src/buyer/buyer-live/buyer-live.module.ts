import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyerLiveComponent } from './buyer-live.component';
import { Route, RouterModule } from '@angular/router';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import {MatTabsModule} from '@angular/material/tabs';
import { AuctionChartComponent } from './auction-chart/auction-chart.component';
import { SupplierLotChartsComponent } from './supplier-lot-charts/supplier-lot-charts.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { ChatCardComponent } from './chat-box/chat-card/chat-card.component';
import { MessagePanelComponent } from './chat-box/message-panel/message-panel.component';
import { FormsModule } from '@angular/forms';

const routes:Route[] = [
  {
    path: '',
    component: BuyerLiveComponent
  }
]

@NgModule({
  declarations: [
    BuyerLiveComponent,
    AuctionChartComponent,
    SupplierLotChartsComponent,
    ChatBoxComponent,
    ChatCardComponent,
    MessagePanelComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatTableModule, 
    MatDividerModule,
    MatSortModule,
    MatTabsModule
  ],
  exports: [RouterModule]
})
export class BuyerLiveModule { }
