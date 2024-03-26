import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierAuctionComponent } from './supplier-auction.component';

describe('SupplierAuctionComponent', () => {
  let component: SupplierAuctionComponent;
  let fixture: ComponentFixture<SupplierAuctionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierAuctionComponent]
    });
    fixture = TestBed.createComponent(SupplierAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
