import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierLiveComponent } from './supplier-live.component';

describe('SupplierLiveComponent', () => {
  let component: SupplierLiveComponent;
  let fixture: ComponentFixture<SupplierLiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierLiveComponent]
    });
    fixture = TestBed.createComponent(SupplierLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
