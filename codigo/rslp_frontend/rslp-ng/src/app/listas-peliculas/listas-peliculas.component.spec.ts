import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListasPeliculasComponent } from './listas-peliculas.component';

describe('ListasPeliculasComponent', () => {
  let component: ListasPeliculasComponent;
  let fixture: ComponentFixture<ListasPeliculasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListasPeliculasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListasPeliculasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
