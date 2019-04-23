import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnadirLibrosComponent } from './anadir-libros.component'

describe('AnadirLibrosComponent', () => {
  let component: AnadirLibrosComponent;
  let fixture: ComponentFixture<AnadirLibrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnadirLibrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnadirLibrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
