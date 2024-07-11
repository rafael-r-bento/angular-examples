import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-slider',
  standalone: true,
  imports: [],
  templateUrl: './custom-slider.component.html',
  styleUrl: './custom-slider.component.css'
})
export class CustomSliderComponent {
  @Input() value = 0;
}
