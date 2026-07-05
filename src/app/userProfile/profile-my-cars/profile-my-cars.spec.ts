import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMyCars } from './profile-my-cars';

describe('ProfileMyCars', () => {
  let component: ProfileMyCars;
  let fixture: ComponentFixture<ProfileMyCars>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileMyCars],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileMyCars);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
