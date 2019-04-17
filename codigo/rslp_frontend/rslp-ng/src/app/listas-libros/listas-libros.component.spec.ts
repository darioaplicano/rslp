import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListasLibrosComponent } from './listas-libros.component';

describe('ListasLibrosComponent', () => {
  let component: ListasLibrosComponent;
  let fixture: ComponentFixture<ListasLibrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListasLibrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListasLibrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
