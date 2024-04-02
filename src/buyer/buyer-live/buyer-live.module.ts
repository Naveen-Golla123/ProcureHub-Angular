import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyerLiveComponent } from './buyer-live.component';
import { Route, RouterModule } from '@angular/router';


const routes:Route[] = [
  {
    path: '',
    component: BuyerLiveComponent
  }
]

@NgModule({
  declarations: [
    BuyerLiveComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class BuyerLiveModule { }
