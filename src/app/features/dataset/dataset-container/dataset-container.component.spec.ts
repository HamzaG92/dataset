import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetContainerComponent } from './dataset-container.component';

describe('DatasetContainerComponent', () => {
  let component: DatasetContainerComponent;
  let fixture: ComponentFixture<DatasetContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatasetContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatasetContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
