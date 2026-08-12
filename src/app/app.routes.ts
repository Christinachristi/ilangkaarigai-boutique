import { Routes } from '@angular/router';
import { AboutUsComponent } from './about-us.component';
import { AdminComponent } from './admin.component';

export const routes: Routes = [
  { path: 'about-us', component: AboutUsComponent },
  { path: 'admin', component: AdminComponent }
];