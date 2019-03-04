import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrdenComponent } from './add-orden.component';

describe('AddOrdenComponent', () => {
  let component: AddOrdenComponent;
  let fixture: ComponentFixture<AddOrdenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrdenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
