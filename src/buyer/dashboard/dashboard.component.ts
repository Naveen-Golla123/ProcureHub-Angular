import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataManagerService } from 'src/shared/services/DataManager.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  public dashboardConfig: any = [
    {
      icon: "plus.png",
      name: "Create Auction",
      route: "../createauction",
      callback: ()=>{this.onCreateAuctionCicked()},
      params: {
        eventId: 0
      }
    },
    {
      icon: "bid.png",
      name: "Auctions",
      route: "../bidsList",
      callback: ()=>{},
      params: {
      }
    },
    {
      icon: "supplier.png",
      name: "Suppliers",
      route: "../supplierList",
      callback: ()=>{},
      params: {
      }
    },
    {
      icon: "gear.png",
      name: "Settings",
      route: "../settings",
      callback: ()=>{},
      params: {
      }
    }
  ];


  constructor(private router: Router,
    private route: ActivatedRoute,
    private dms:DataManagerService) {
    console.log("Hello world");
  }

  onCreateAuctionCicked() {
    this.dms.setDataStoreValue("eventCode", 0);
  }
}
