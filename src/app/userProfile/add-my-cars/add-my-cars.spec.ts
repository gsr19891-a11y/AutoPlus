import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMyCars } from './add-my-cars';

describe('AddMyCars', () => {
  let component: AddMyCars;
  let fixture: ComponentFixture<AddMyCars>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMyCars],
    }).compileComponents();

    fixture = TestBed.createComponent(AddMyCars);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
