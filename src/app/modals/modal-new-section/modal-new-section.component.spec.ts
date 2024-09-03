import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNewSectionComponent } from './modal-new-section.component';

describe('ModalNewSectionComponent', () => {
  let component: ModalNewSectionComponent;
  let fixture: ComponentFixture<ModalNewSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalNewSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalNewSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
