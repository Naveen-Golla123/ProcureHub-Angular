import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environment';
import { Auction, SupplierAuction } from 'src/shared/models/Auction.model';
import { AuctionStatus } from 'src/shared/models/AuctionStatus.enum';
import { DataManagerService } from 'src/shared/services/DataManager.service';
import { EventService } from 'src/shared/services/EventService.service';
import { SupplierService } from 'src/shared/services/SupplierService.service';

@Component({
  selector: 'app-supplier-auction',
  templateUrl: './supplier-auction.component.html',
  styleUrls: ['./supplier-auction.component.scss']
})
export class SupplierAuctionComponent {

  dataSource = new MatTableDataSource<Auction>();
  auctions: SupplierAuction[] = [];
  masterAuctions: SupplierAuction[] = [];
  displayedColumns: string[] = ['name', 'displayStatusCode', "action"];

  headerCofig: any = {
    title: "Auctions",
    subTitle: "",
    enableSubTitle: false
  }

  constructor(private supplierService: SupplierService, private router: Router,
    private toasterService: ToastrService,
    private route: ActivatedRoute,
    private dataService: DataManagerService,
    private eventservice: EventService,
    private spinnerService: NgxSpinnerService) {

  }

  ngOnInit(): void {
    this.spinnerService.show();
    this.supplierService.getInvitedEvents().subscribe((events: any) => {

      if (events && events.length > 0) {
        events.forEach((event: any) => {
          var event_: SupplierAuction = {
            name: event.name,
            description: event.description,
            statusCode: event.statusCode,
            displayStatusCode: AuctionStatus[event.statusCode],
            id: event.eventId,
            createdBy: event.createdBy,
            isInvited: event.isInvited,
            isRejected: event.isRejected,
            isAccepted: event.isAccepted
          }
          this.auctions.push(event_);
        })
      }
      this.dataSource.data = this.auctions;
      this.masterAuctions = this.auctions;
      this.spinnerService.hide();
    })

  }

  accepted(auction: any) {
    this.eventservice.acceptEvent(auction.id).subscribe(result => {
      if (result && result != 0) {
        auction.isAccepted = true;
        this.toasterService.success("Accepted Invite Successfully !!")
      }
    });
  }

  rejected(auction: any) {
    this.eventservice.rejectEvent(auction.id).subscribe(result => {
      if (result && result != 0) {
        auction.isAccepted = true;
        this.toasterService.success("Rejected Invite Successfully !!")
      }
    })
  }

  onFilterClicked(filterParam: string) {
    if (filterParam == "All") {
      this.auctions = this.masterAuctions;
    } else {
      this.auctions = this.masterAuctions.filter((x: any) => x[filterParam] == true);
    }
    this.dataSource.data = this.auctions;
  }  

  openAuction(auction: any) {
    var targetUrl = window.location.origin + `/auction/${auction.id}`
    window.open(targetUrl, "_blank");
  }   
}
