import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataManagerService } from '../services/DataManager.service';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.scss']
})
export class AuctionComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute,
    private dataManagerService: DataManagerService) {

  }

  ngOnInit(): void {
    // set navigation to supplier ot buyer
    var userInfo = this.dataManagerService.getUserInfo();
    if (userInfo && userInfo.isSupplier == "True") {
      this.router.navigate([{ outlets: { liveAuction: ['supplierAuction'] } }], { relativeTo: this.route.parent, skipLocationChange: true });
    } else {
      this.router.navigate([{ outlets: { liveAuction: ['buyerAuction'] } }], { relativeTo: this.route.parent, skipLocationChange: true });
    }
  }
}
