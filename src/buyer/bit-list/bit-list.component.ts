import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Auction } from 'src/shared/models/Auction.model';
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
  displayedColumns: string[] = ['name', 'status', "action"];

  headerCofig: any = {
    title: "Auctions",
    subTitle: "",
    enableSubTitle: false
  }

  constructor(private eventService: EventService,private router: Router,
    private route: ActivatedRoute,
    private dataService: DataManagerService) {

  }

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe((events: any) => {
      if (events && events.length > 0) {
        events.forEach((event: any) => {
          var event_: Auction = {
            name: event.name,
            description : event.description,
            statusCode : event.statusCode,
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
    })
    
  }

  eventClicked(auction: Auction) {
    console.log(auction)
  }
}
