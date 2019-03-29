import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcreedoresComponent } from './acreedores.component';

describe('AcreedoresComponent', () => {
  let component: AcreedoresComponent;
  let fixture: ComponentFixture<AcreedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcreedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcreedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
