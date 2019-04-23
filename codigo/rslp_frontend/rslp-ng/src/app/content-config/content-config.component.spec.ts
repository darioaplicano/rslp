import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentConfigComponent } from './content-config.component';

describe('ContentConfigComponent', () => {
  let component: ContentConfigComponent;
  let fixture: ComponentFixture<ContentConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
