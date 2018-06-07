import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatSetsComponent } from './cat-sets.component';

describe('CatSetsComponent', () => {
  let component: CatSetsComponent;
  let fixture: ComponentFixture<CatSetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatSetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
