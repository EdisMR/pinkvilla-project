import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridinformationComponent } from './gridinformation.component';

describe('GridinformationComponent', () => {
  let component: GridinformationComponent;
  let fixture: ComponentFixture<GridinformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridinformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
