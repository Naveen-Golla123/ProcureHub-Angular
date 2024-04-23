import { Component, ElementRef, Input, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import * as _ from 'lodash';
import { last } from 'lodash';

@Component({
  selector: 'app-supplier-lot-charts',
  templateUrl: './supplier-lot-charts.component.html',
  styleUrls: ['./supplier-lot-charts.component.scss']
})
export class SupplierLotChartsComponent implements OnInit {

  @Input("config") config: any;
  chart: Chart | undefined = undefined;
  suppliers: any[] = [];
  chartData: any = [];
  activeSupplierId: Number = 0;
  activeSupplierName: string = "";
  chartLables: any = [];
  chartValues: any = [];

  constructor(private elementRef: ElementRef) {

  }

  ngOnInit(): void {
    this.config.callback = () => this.setData();
  }

  setSupplierSelection() {
    let supplierIds = Object.keys(this.config.suppliers);
    this.activeSupplierId = Number(supplierIds[0]);
    this.activeSupplierName = this.config.suppliers[this.activeSupplierId + ""]["name"];
    _.map(this.config.suppliers, (value: any, item: any) => {
      this.suppliers.push({
        name: value.name,
        id: value.id
      })
    });
  }

  setData() {
    this.setSupplierSelection();
    this.processData();
    this.createChart();
  }

  createChart() {
    let htmlRef = this.elementRef.nativeElement.querySelector(`#canvas1`);
    this.chart?.destroy();
    this.chart = new Chart(htmlRef, {
      type: 'line',
      data: {
        labels: this.chartLables,
        datasets: [
          {
            data: this.chartValues,
            label: `${this.activeSupplierName} Bids Trend`
          }
        ],

      },
      options: {
        scales: {
          y: {
            stacked: true
          }
        }
      }
    });
  }

  processData() {
    let supplierData = this.config.suppliers[this.activeSupplierId + ""];
    this.activeSupplierName = this.config.suppliers[this.activeSupplierId + ""]["name"];
    let supplierBidTrack = supplierData.bidTracker;
    this.chartData = [];
    this.chartLables = [];
    this.chartValues = [];
    supplierBidTrack.forEach((supplier: any) => {
      //this.chartData.push({ x: supplier.bidTime, y: supplier.bidAmount });
      let date = new Date(supplier.bidTime);
      let bidTime = date.getMonth() + "/" + date.getMonth()+ " - " + date.getHours() + ":" + date.getMinutes();
      this.chartLables.push(bidTime);
      this.chartValues.push(supplier.bidAmount);
    });
  }

  onSelectionChanged(event: any) {
    console.log(event);
    // this.chartLables = [];
    // this.chartValues =[];
    this.processData();
    // this.chart.data.datasets[0].label = `${this.activeSupplierName} Bids Trend`;
    this.createChart();
  }
}
