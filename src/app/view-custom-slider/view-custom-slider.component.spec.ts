import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCustomSliderComponent } from './view-custom-slider.component';

describe('ViewCustomSliderComponent', () => {
  let component: ViewCustomSliderComponent;
  let fixture: ComponentFixture<ViewCustomSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCustomSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCustomSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
