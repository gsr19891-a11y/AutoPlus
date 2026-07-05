import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileRentCars } from './profile-rent-cars';

describe('ProfileRentCars', () => {
  let component: ProfileRentCars;
  let fixture: ComponentFixture<ProfileRentCars>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileRentCars],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileRentCars);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
