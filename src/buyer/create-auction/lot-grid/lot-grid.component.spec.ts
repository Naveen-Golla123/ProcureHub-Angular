import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotGridComponent } from './lot-grid.component';

describe('LotGridComponent', () => {
  let component: LotGridComponent;
  let fixture: ComponentFixture<LotGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LotGridComponent]
    });
    fixture = TestBed.createComponent(LotGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
