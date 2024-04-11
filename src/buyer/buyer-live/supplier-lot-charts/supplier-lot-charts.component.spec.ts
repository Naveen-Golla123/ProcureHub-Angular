import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierLotChartsComponent } from './supplier-lot-charts.component';

describe('SupplierLotChartsComponent', () => {
  let component: SupplierLotChartsComponent;
  let fixture: ComponentFixture<SupplierLotChartsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierLotChartsComponent]
    });
    fixture = TestBed.createComponent(SupplierLotChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
