import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

    public dashboardConfig:any = [
      {
        icon : "plus.png",
        name : "Create Auction",
        route: "../createauction"
      },
      {
        icon : "bid.png",
        name: "Auctions",
        route: "../createauction"
      },
      {
        icon: "supplier.png",
        name: "Suppliers",
        route: "../createauction"
      },
      {
        icon : "gear.png",
        name: "Settings",
        route: "../settings"
      }
    ];


    constructor(private router: Router, 
      private route: ActivatedRoute)
    {
      console.log("Hello world");
    }

    

    // onItemClicked(route: string) {
    //   this.router.navigate([{outlets: { buyerHome : [route]}}], { skipLocationChange: true});
    // }
}
