import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMyFavorites } from './profile-my-favorites';

describe('ProfileMyFavorites', () => {
  let component: ProfileMyFavorites;
  let fixture: ComponentFixture<ProfileMyFavorites>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileMyFavorites],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileMyFavorites);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
