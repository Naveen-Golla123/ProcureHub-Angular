import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-cards',
  templateUrl: './dashboard-cards.component.html',
  styleUrls: ['./dashboard-cards.component.scss']
})
export class DashboardCardsComponent implements OnInit {
  @Input("config") config: any;
  public iconPath = "";
  constructor() {
    
  }

  ngOnInit(): void {
    console.log(this.config);
    this.iconPath = `../../../assets/icons/${this.config.icon}`;
  }

}
