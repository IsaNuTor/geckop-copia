import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAcreedoresComponent } from './form-acreedores.component';

describe('FormAcreedoresComponent', () => {
  let component: FormAcreedoresComponent;
  let fixture: ComponentFixture<FormAcreedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAcreedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAcreedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
