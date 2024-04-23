import { Component, Input, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { last } from 'lodash';

@Component({
  selector: 'app-auction-chart',
  templateUrl: './auction-chart.component.html',
  styleUrls: ['./auction-chart.component.scss']
})
export class AuctionChartComponent implements OnInit {
  @Input("config") config:any;
  chart: Chart | undefined = undefined;
  constructor() {
    
  }
  ngOnInit(): void {
    this.config.callback = ()=> this.setData();
  }

  setData() {
    this.chart?.destroy();
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels:this.config.labels,
        datasets: [
          {
            data: this.config.data,
            label: "Bids Trend"
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
  })
  }
}
