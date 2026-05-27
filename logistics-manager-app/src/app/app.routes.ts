import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { FleetList } from './components/fleet-list/fleet-list';
import { ServiceQueue } from './components/service-queue/service-queue';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'fleet', component: FleetList },
  { path: 'service-queue', component: ServiceQueue }
];
