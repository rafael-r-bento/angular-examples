import { Component } from '@angular/core';
import { ProfilePhotoComponent } from '../profile-photo/profile-photo.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ProfilePhotoComponent],
  template: `<app-profile-photo />`,
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

}
