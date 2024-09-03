import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOnboardingComponent } from './add-onboarding.component';

describe('AddOnboardingComponent', () => {
  let component: AddOnboardingComponent;
  let fixture: ComponentFixture<AddOnboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddOnboardingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
