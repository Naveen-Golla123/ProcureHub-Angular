import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionChartComponent } from './auction-chart.component';

describe('AuctionChartComponent', () => {
  let component: AuctionChartComponent;
  let fixture: ComponentFixture<AuctionChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuctionChartComponent]
    });
    fixture = TestBed.createComponent(AuctionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
