import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataManagerService } from 'src/shared/services/DataManager.service';

@Component({
  selector: 'app-supplier-dashboard',
  templateUrl: './supplier-dashboard.component.html',
  styleUrls: ['./supplier-dashboard.component.scss']
})
export class SupplierDashboardComponent {

    public dashboardConfig: any = [
      {
        icon: "bid.png",
        name: "Auction Invitations",
        route: "../auctions",
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
