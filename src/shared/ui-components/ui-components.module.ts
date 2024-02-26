import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopUpComponent } from './pop-up/pop-up.component';
import { NotificationComponent } from './notification/notification.component';
import { DashboardCardsComponent } from './dashboard-cards/dashboard-cards.component';
import { PageHeaderComponent } from './page-header/page-header.component';



@NgModule({
  declarations: [
    PopUpComponent,
    NotificationComponent,
    DashboardCardsComponent,
    PageHeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DashboardCardsComponent,
    PageHeaderComponent
    
  ]
})
export class UiComponentsModule { }
