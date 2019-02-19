import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAcreedorComponent } from './add-acreedor.component';

describe('AddAcreedorComponent', () => {
  let component: AddAcreedorComponent;
  let fixture: ComponentFixture<AddAcreedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAcreedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAcreedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
