import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { callback } from 'chart.js/dist/helpers/helpers.core';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { BuyerDashboard } from 'src/shared/models/BuyerDashboard.model';
import { AuctionHub } from 'src/shared/services/AuctionHub.service';
import { LiveAuctionService } from 'src/shared/services/LiveAuction.service';

@Component({
  selector: 'app-buyer-live',
  templateUrl: './buyer-live.component.html',
  styleUrls: ['./buyer-live.component.scss']
})
export class BuyerLiveComponent implements OnInit {

  enableChatContainer: boolean = false;
  displayedColumns: string[] = ['rank', 'name', 'bid', 'isWinner'];
  auctionHeaderInfo: any = {
    callback: null
  };

  currentDate = new Date();

  // Calculate the time difference between the target date and the current date
  timeDifference = 0;

  timerDisplay = "00:00:00";
  targetDate = new Date("2024-04-02T23:37:59");
  timerColorRed = false;
  auctionChartData: any = {
    callback: null,
    data: [],
    labels: []
  };

  supplierWiseChartConfig:any = {
    callback: null,
    supplierList: []
  };
  // Convert the time difference to seconds
  totalSeconds = 0;
  intervalId: any;
  dataSource: any;
  eventId:any;

  @ViewChild(MatSort) sort: MatSort | undefined;
  dashboardData: BuyerDashboard = {
    suppliers: null,
    ranks: null,
    bestBids: null
  };

  constructor(private _liveAnnouncer: LiveAnnouncer,
    private liveService: LiveAuctionService,
    private toastrService: ToastrService,
    private auctionHub: AuctionHub) {

  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    let eventIdString = localStorage.getItem("eventId");
    if(eventIdString) {
      this.eventId = Number(JSON.parse(eventIdString));
    }
    this.getDashBoardData();
  }

  getDashBoardData() {
    this.liveService.getSupplierDashBoardDate(this.eventId).subscribe((result: any) => {
      console.log(result);
      if (result) {
        this.updateDashboardData(result);
      }
    });
  }

  getOnlineUsers() {
    this.auctionHub._hubConnection?.invoke("GetOnlineUsers", this.eventId!.toString()).then((res:any)=>{
      this.updateUserStatus(res);
    });
  }

  async setSingalR() {
    await this.auctionHub.startHub();
    this.auctionHub._hubConnection?.on('BidPlaced', (data: any) => {
      console.log(data);
      this.toastrService.show("Bid placed");
      this.updateDashboardData(data);
    });

    this.auctionHub._hubConnection?.on("connections", (res: any) => {
      console.log(res);
      this.updateUserStatus(res);
    });

    this.getOnlineUsers();
  }

  updateUserStatus(res: any) {
    _.map(this.dashboardData.suppliers,(value:any,key:any)=>{
      value["status"] = false;
    });

    res.forEach((user: any) => {
      if (this.dashboardData.suppliers[user.userId + ""]) {
        this.dashboardData.suppliers[user.userId + ""]["status"] = true;
      }
    })
  }

  setTimer() {
    this.intervalId = setInterval(() => this.initalizeTimer(), 1000);
    this.timeDifference = this.targetDate.getTime() - this.currentDate.getTime();
    this.totalSeconds = Math.floor(this.timeDifference / 1000);
  }

  updateDashboardData(data: any) {
    this.auctionHeaderInfo["numberOfActiveSuppliers"] = 0;
    this.auctionHeaderInfo["numberOfSuppliers"] = Object.values(data.suppliers).length;
    this.auctionHeaderInfo["auctionName"] = data.eventInfo.name;
    this.auctionHeaderInfo["statusCode"] = data.eventInfo.statusCode;
    this.targetDate = new Date(data.eventInfo.enddate + "T" + data.eventInfo.endtime);
    this.dashboardData.bestBids = data.topBiders;
    this.dashboardData.ranks = data.ranks;
    this.dashboardData.suppliers = data.suppliers;
    this.enableChatContainer = true;
    this.setSingalR();
    this.setTimer();
    if (data && data.ranks) {
      this.updateRanks();
    }
    this.updateCharts();
  }

  updateCharts() {
    // best bids
    this.dashboardData.bestBids.forEach((bid: any) => {
      this.auctionChartData.data.push(bid.bidAmount)
      this.auctionChartData.labels.push(bid.bidTime)
    });
    if (this.auctionChartData.callback) {
      this.auctionChartData.callback();
    }

    if(this.dashboardData.suppliers && this.supplierWiseChartConfig.callback) {
      this.supplierWiseChartConfig.suppliers = this.dashboardData.suppliers;
      this.supplierWiseChartConfig.callback();
    }
  }

  updateRanks() {
    let rankObjs = Object.values(this.dashboardData!.ranks);
    rankObjs.sort((e: any, b: any) => e.rank - b.rank);
    let rankData: any = [];
    rankObjs.forEach((rank: any) => {
      rankData.push({
        rank: rank.rank,
        name: rank.supplier.name,
        bid: rank.totalBid,
        isWinner: this.auctionHeaderInfo["statusCode"] == 3 && rank.rank == 1 ? true: false
      });
      if (rank.rank == 1) {
        this.auctionHeaderInfo["bestBid"] = rank.totalBid;
      }
    })
    this.dataSource.data = rankData;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  initalizeTimer() {
    const hours = Math.floor(this.totalSeconds / 3600);
    const minutes = Math.floor((this.totalSeconds % 3600) / 60);
    const seconds = Math.floor(this.totalSeconds % 60);
    this.timerDisplay = `${this.getTwoDigits(hours)}:${this.getTwoDigits(minutes)}:${this.getTwoDigits(seconds)}`;
    this.totalSeconds--;
    if (this.totalSeconds < 300) {
      this.timerColorRed = true;
    }

    if (this.totalSeconds < 0) {
      console.log("Countdown has ended");
      clearInterval(this.intervalId);
    }
  }

  setSupplierWiseData() {
    
  }

  getTwoDigits(number: number) {
    return number <= 0 ? "00" : (number < 10 ? "0" + number : number);
  }

}
