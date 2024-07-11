import { Component } from '@angular/core';
import { CustomSliderComponent } from '../custom-slider/custom-slider.component';

@Component({
  selector: 'app-view-custom-slider',
  standalone: true,
  imports: [CustomSliderComponent],
  templateUrl: './view-custom-slider.component.html',
  styleUrl: './view-custom-slider.component.css'
})
export class ViewCustomSliderComponent {

}
