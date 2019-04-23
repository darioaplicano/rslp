import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnadirPeliculasComponent } from './anadir-peliculas.component';

describe('AnadirPeliculasComponent', () => {
  let component: AnadirPeliculasComponent;
  let fixture: ComponentFixture<AnadirPeliculasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnadirPeliculasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnadirPeliculasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
