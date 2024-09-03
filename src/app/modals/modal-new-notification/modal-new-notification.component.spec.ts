import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNewNotificationComponent } from './modal-new-notification.component';

describe('ModalNewNotificationComponent', () => {
  let component: ModalNewNotificationComponent;
  let fixture: ComponentFixture<ModalNewNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalNewNotificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalNewNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
