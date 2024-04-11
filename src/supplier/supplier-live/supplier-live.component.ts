import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { Lot } from 'src/shared/models/Lot';
import { LiveAuctionService } from 'src/shared/services/LiveAuction.service';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import * as signalR from '@microsoft/signalr';
import { TitleStrategy } from '@angular/router';
import { AuctionHub } from 'src/shared/services/AuctionHub.service';
import { DataManagerService } from 'src/shared/services/DataManager.service';

@Component({
  selector: 'app-supplier-live',
  templateUrl: './supplier-live.component.html',
  styleUrls: ['./supplier-live.component.scss']
})
export class SupplierLiveComponent implements OnInit {
  userInfo: any;
  _hubConnection: signalR.HubConnection | undefined;
  activeLot: any;
  totalPrice = 0;
  auctionRank = 0;
  rowData: any = [];
  apiResult: any = {};
  colDefs: ColDef[] = [
    { field: "name", editable: false, flex: 1 },
    { field: "description", editable: false, flex: 1 },
    { field: "basePrice", editable: true, flex: 1 },
    { field: "quantity", editable: false, flex: 1 }
  ];
  eventId: number = 0;
  auctionHeaderInfo: any = {

  };
  private api!: any;
  lots: any = {};

  constructor(private liveAuctionService: LiveAuctionService,
    private spinnerService: NgxSpinnerService,
    private toastrservice: ToastrService,
    private auctionHub: AuctionHub,
    private dataManager: DataManagerService) {
  }

  ngOnInit(): void {
    this.userInfo = this.dataManager.getUserInfo();
    this.initiateDashboard();
    this.auctionHub.startHub();
  }

  initiateDashboard() {
    let eventIdString = localStorage.getItem("eventId");
    if(eventIdString){
      this.eventId = Number(JSON.parse(eventIdString));
    }
    this.spinnerService.show();
    this.liveAuctionService.getSupplierDashBoardDate(this.eventId).subscribe((result: any) => {
      this.updateDashboard(result);
      this.setSignalR();
      this.spinnerService.hide();
    });
  }

  setSignalR() {
    this._hubConnection = this.auctionHub._hubConnection;
    this._hubConnection?.on('Send', (data: any) => {
      const received = `Received: ${data}`;
    });

    this._hubConnection?.on('BidPlaced', (data: any) => {
      console.log(data);
      this.toastrservice.show("Bid placed");
      this.updateDashboard(data);
    });
  }

  updateDashboard(data: any) {
    if (data) {
      if (data.suppliers) {
        var supplierLot = data.suppliers[this.userInfo['userId']];
        this.totalPrice = 0;
        _.each(supplierLot.supplierLots, (value: any, key: string) => {
          // this.lots.push(value);
          this.lots[key] = value;
          this.totalPrice += value.totalPrice;
        });
        var lotValues: any = Object.values(this.lots);
        this.activeLot = lotValues[0];
      }

      if (data.ranks) {
        this.auctionHeaderInfo["rank"] = data.ranks[this.userInfo["userId"]]?.rank;

        _.each(data.ranks, (value: any, key: any) => {
          if (value.rank == 1) {
            this.auctionHeaderInfo["bestBid"] = value.totalBid;
          }
        });
      }

      if (data.eventInfo) {
        this.auctionHeaderInfo["auctionName"] = data.eventInfo.name;
        this.auctionHeaderInfo["numberOfSupplier"] = Object.keys(data.suppliers).length;
      }
      this.apiResult = data;
      this.processItemsGrid();
    }

  }

  processItemsGrid() {
    this.rowData = this.activeLot.has_item;
  }

  getLotId(element: any) {
    return element.value._id;
  }

  switchLot(lot: any) {
    this.activeLot = lot.value;
    this.processItemsGrid();
  }

  placeBid() {
    console.log("Bif Placed");
    this.apiResult.suppliers[this.userInfo['userId']]["supplierLots"] = this.lots;
    this.apiResult["suppliers"][this.userInfo["userId"]]["currentBid"] = this.totalPrice;
    this._hubConnection?.invoke("BidPlaced", this.apiResult["suppliers"][this.userInfo["userId"]]);
  }

  lotSwicth(lotId: number) {
    
  }

  onGridReady = (event: any) => {
    // Store the api for later use
    this.api = event.api;
  }

  onBasePriceChanged(element: any) {
    console.log(element);
    this.updateData(element);
    this.updateTotals();
  }

  updateData(element: any) {
    var lot = this.lots[this.activeLot._id];
    let totalPrice = 0;
    lot.has_item.forEach((item: any) => {
      if (item._id == this.activeLot._id) {
        item.basePrice = element.newValue;
      }
      totalPrice += (item.basePrice * item.quantity);
    });
    lot.totalPrice = totalPrice;
    this.activeLot = lot;
    this.lots[this.activeLot._id] = lot;
  }

  updateTotals() {
    let totalPrice = 0;
    _.each(this.lots, (value: any, key: string) => {
      // this.lots.push(value);
      totalPrice += value.totalPrice;
    });
    this.totalPrice = totalPrice;
  }
} 
