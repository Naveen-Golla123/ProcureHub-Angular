import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-buyer-home',
  templateUrl: './buyer-home.component.html',
  styleUrls: ['./buyer-home.component.scss']
})
export class BuyerHomeComponent implements OnInit{
  constructor(private router: Router, 
    private route: ActivatedRoute){
    console.log("Hellow Buyer Module!!")
  }

  ngOnInit(): void {
    this.dashboardClicked();
  }

  dashboardClicked() {
  this.router.navigate([{ outlets: { buyerHome: ['dashboard'] } }], { relativeTo: this.route.parent, skipLocationChange: true });
  }

  settingsClicked() {
    this.router.navigate([{outlets: { buyerHome : ['settings']}}], { relativeTo: this.route.parent, skipLocationChange: true});
  }

  createAuctionClicked() {
    this.router.navigate([{outlets: { buyerHome : ['createauction']}}], { relativeTo: this.route.parent, skipLocationChange: true});
  }

  logOut() {
    console.log("Logout clicked !!")
  }
}
