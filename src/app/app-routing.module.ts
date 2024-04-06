import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./allPages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./allPages/about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'blog',
    loadChildren: () => import('./allPages/blog/blog.module').then(m => m.BlogModule)
  },
  {
    path: 'blog-details',
    loadChildren: () => import('./allPages/blog-details/blog-details.module').then(m => m.BlogDetailsModule)
  },
  {
    path: 'services',
    loadChildren: () => import('./allPages/services/services.module').then(m => m.ServicesModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./allPages/contact/contact.module').then(m => m.ContactModule)
  },
  {
    path: 'appointments',
    loadChildren: () => import('./allPages/appointments/appointments.module').then(m => m.AppointmentsModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./allPages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./allPages/register/register.module').then(m => m.RegisterModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration:'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
