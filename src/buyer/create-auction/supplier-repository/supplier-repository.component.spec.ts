import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierRepositoryComponent } from './supplier-repository.component';

describe('SupplierRepositoryComponent', () => {
  let component: SupplierRepositoryComponent;
  let fixture: ComponentFixture<SupplierRepositoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierRepositoryComponent]
    });
    fixture = TestBed.createComponent(SupplierRepositoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
