import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerLiveComponent } from './buyer-live.component';

describe('BuyerLiveComponent', () => {
  let component: BuyerLiveComponent;
  let fixture: ComponentFixture<BuyerLiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyerLiveComponent]
    });
    fixture = TestBed.createComponent(BuyerLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
