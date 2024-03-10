import { Component, OnInit, SkipSelf, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator"
import { Supplier } from 'src/shared/models/supplier';
import { SelectionModel } from '@angular/cdk/collections';
import { DataManagerService } from 'src/shared/services/DataManager.service';
import { EventService } from 'src/shared/services/EventService.service';
import { ActivatedRoute } from '@angular/router';
import { Auction } from 'src/shared/models/Auction.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create-auction',
  templateUrl: './create-auction.component.html',
  styleUrls: ['./create-auction.component.scss']
})
export class CreateAuctionComponent implements OnInit {

  headerCofig: any = {
    title: "Create Auction",
    subTitle: "",
    enableSubTitle: false
  }
  //@ViewChild(MatPaginator) paginator: MatPaginator;
  public supplierList: Supplier[] = [];
  dataSource = new MatTableDataSource<Supplier>();
  selection = new SelectionModel<Supplier>(true, []);
  displayedColumns: string[] = ['select', 'name', 'partnerName', 'email'];
  isNewAuction: boolean = false;
  auction: any;
  eventId: number = 0;

  constructor(private dms: DataManagerService,
    private spinnerService: NgxSpinnerService,
    private eventService: EventService,
    private route: ActivatedRoute) {
    console.log("Hello Create Auction");
    //this.dataSource.paginator = this.paginator;

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.eventId = params['eventId'];
      this.dms.setDataStoreValue("eventId", this.eventId);
      this.isNewAuction = this.eventId == 0 ? true : false;
      this.initalizeAuction();
    });

    for (var i = 1; i < 10; i++) {
      this.supplierList.push({
        name: "Supplier Name" + i,
        partnerName: "PartnerName" + i,
        email: "email" + i
      })
    }
    this.dataSource.data = this.supplierList;
    this.spinnerService.show();
  }

  initalizeAuction() {
    if (this.eventId == 0) {
      this.auction = {
        id: this.eventId,
        name: "",
        description: "",
        startdate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        statusCode: 1
      }
    } else {
      this.eventService.getEventById(this.eventId).subscribe((result: any) => {
        console.log(result);
        this.auction = {
          id: result.id,
          name: result.name,
          description: result.description,
          startdate: result.startdate,
          startTime: result.starttime,
          endDate: result.enddate,
          endTime: result.endtime,
          statusCode: 1
        }
      })
    }
  }

  createEvent() {
    let self = this;
    if (this.isNewAuction) {
      this.eventService.createEvent({
        "id": 0,
        "name": this.auction.name,
        "type": "1",
        "businessType": 2,
        "description": this.auction.description,
        "startdate": this.auction.startdate,
        "enddate": this.auction.endDate,
        "starttime": this.auction.startTime,
        "endtime": this.auction.endTime
      }).subscribe((result: any) => {
        if (result) {
          self.dms.setDataStoreValue("eventInfo", result);
          self.eventId = result["id"];
          self.auction.name = result["name"];
          self.isNewAuction = false;
          self.headerCofig.title = this.auction.name;
          self.headerCofig.subTitle = "Draft";
          self.headerCofig.enableSubTitle = true;
        }
      });
    } else {
      this.eventService.updateEvent({
        "id": this.eventId,
        "name": this.auction.name,
        "type": "1",
        "businessType": 2,
        "description": this.auction.description,
        "startdate": this.auction.startdate,
        "enddate": this.auction.endDate,
        "starttime": this.auction.startTime,
        "endtime": this.auction.endTime
      }).subscribe((result: any) => {
        if (result) {
          self.dms.setDataStoreValue("eventInfo", result);
          self.eventId = result["id"];
          self.auction.name = result["name"];
          self.auction.startdate = result["startdate"] ? result["startdate"] : "";
          self.auction.startTime = result["starttime"] ? result["starttime"] : "";
          self.auction.endDate = result["enddate"] ? result["enddate"] : "";
          self.auction.endTime = result["endtime"] ? result["endtime"] : "";
          self.isNewAuction = false;
          self.headerCofig.title = this.auction.name;
          self.headerCofig.subTitle = "Draft";
          self.headerCofig.enableSubTitle = true;
        }
      });
    }
  }

  convertDate(date: string) {
    if (date && date.length > 0) {
      var date_ = new Date(date);
      return {
        "year": date_.getFullYear(),
        "month": date_.getMonth(),
        "day": date_.getDate(),
        "dayOfWeek": date_.getDay()
      }
    } else {
      return null;
    }
  }

  convertTime(time: string) {
    if (time && time.length > 0) {
      var timeSplit = time.split(":");
      return {
        hour: timeSplit[0],
        minute: timeSplit[1]
      }
    } else {
      return null;
    }
  }

  saveAsDraft() {
    console.log(this.auction);
    // validate for first two sections (basic info and schedule).
    if (!(this.auction.name && this.auction.name.length > 1)) {
      // Auction name is missing
    } else if (!(this.auction.description && this.auction.description.length)) {
      // Auction desc is missing.
    } else if (!(this.auction.startdate && this.auction.startdate.length > 1 && this.auction.startTime && this.auction.startTime.length > 1)) {
      // auction start time and date
    } else if (!(this.auction.endDate && this.auction.endDate.length > 1)) {
      // auction end data missing.
    }
    this.createEvent()
  }

  submitAuction() {
    // validate for whole auction ( A to Z).
    this.createEvent();

  }
}
