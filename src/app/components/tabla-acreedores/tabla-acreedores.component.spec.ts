import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaAcreedoresComponent } from './tabla-acreedores.component';

describe('TablaAcreedoresComponent', () => {
  let component: TablaAcreedoresComponent;
  let fixture: ComponentFixture<TablaAcreedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaAcreedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaAcreedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
