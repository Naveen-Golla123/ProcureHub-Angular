import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environment';
import { Auction } from 'src/shared/models/Auction.model';
import { AuctionStatus } from 'src/shared/models/AuctionStatus.enum';
import { DataManagerService } from 'src/shared/services/DataManager.service';
import { EventService } from 'src/shared/services/EventService.service';

@Component({
  selector: 'app-bit-list',
  templateUrl: './bit-list.component.html',
  styleUrls: ['./bit-list.component.scss']
})
export class BitListComponent implements OnInit {

  dataSource = new MatTableDataSource<Auction>();
  auctions: Auction[] = [];
  displayedColumns: string[] = ['name', 'displayStatusCode', "action"];

  headerCofig: any = {
    title: "Auctions",
    subTitle: "",
    enableSubTitle: false
  }

  constructor(private eventService: EventService,private router: Router,
    private route: ActivatedRoute,
    private dataService: DataManagerService,
    private spinnerService: NgxSpinnerService) {

  }

  ngOnInit(): void {
    
    this.getData();
  }

  getData(){
    this.spinnerService.show();
    this.eventService.getAllEvents().subscribe((events: any) => {
      if (events && events.length > 0) {
        this.auctions = [];
        events.forEach((event: any) => {
          var event_: Auction = {
            name: event.name,
            description : event.description,
            statusCode : event.statusCode,
            displayStatusCode: AuctionStatus[event.statusCode],
            startdate: ",",
            startTime: ",",
            endTime: "",
            endDate: "",
            id: event.id,
          }
          this.auctions.push(event_);
        })
      }
      this.dataSource.data = this.auctions;
      this.spinnerService.hide();
    });
  }

  eventClicked(auction: Auction) {
    //window.open(`${window.location.origin}/auction/${auction.id}`, "_blank")
    console.log(auction)
  }

  reloadData() {
    this.getData();
  }

  navClicked(auction: Auction) {
    window.open(`${window.location.origin}/auction/${auction.id}`, "_blank")
    console.log(auction)
  }
}
