import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarContenidoComponent } from './agregar-contenido.component';

describe('AgregarContenidoComponent', () => {
  let component: AgregarContenidoComponent;
  let fixture: ComponentFixture<AgregarContenidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarContenidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarContenidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
