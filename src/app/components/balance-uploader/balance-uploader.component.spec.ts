import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceUploaderComponent } from './balance-uploader.component';

describe('BalanceUploaderComponent', () => {
  let component: BalanceUploaderComponent;
  let fixture: ComponentFixture<BalanceUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceUploaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalanceUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
