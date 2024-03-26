import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierLotCardComponent } from './supplier-lot-card.component';

describe('SupplierLotCardComponent', () => {
  let component: SupplierLotCardComponent;
  let fixture: ComponentFixture<SupplierLotCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierLotCardComponent]
    });
    fixture = TestBed.createComponent(SupplierLotCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
