import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodoListItemComponent } from './todo-list-item/todo-list-item.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ViewCustomSliderComponent } from './view-custom-slider/view-custom-slider.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'example1', component: TodoListItemComponent },
  { path: 'example2', component: UserProfileComponent },
  { path: 'example3', component: ViewCustomSliderComponent },
];
