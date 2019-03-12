import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoProyectoComponent } from './info-proyecto.component';

describe('InfoProyectoComponent', () => {
  let component: InfoProyectoComponent;
  let fixture: ComponentFixture<InfoProyectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoProyectoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
