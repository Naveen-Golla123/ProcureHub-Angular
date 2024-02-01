import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthEntryComponent } from './auth-entry.component';

describe('AuthEntryComponent', () => {
  let component: AuthEntryComponent;
  let fixture: ComponentFixture<AuthEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthEntryComponent]
    });
    fixture = TestBed.createComponent(AuthEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
