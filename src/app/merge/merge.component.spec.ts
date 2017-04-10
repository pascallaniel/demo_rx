import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Autocomplete2Component } from './autocomplete2.component';

describe('Autocomplete2Component', () => {
  let component: Autocomplete2Component;
  let fixture: ComponentFixture<Autocomplete2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Autocomplete2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Autocomplete2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
