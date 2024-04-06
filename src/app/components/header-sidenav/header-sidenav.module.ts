import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderSidenavComponent } from './header-sidenav.component';
import { HomeRoutingModule } from 'src/app/allPages/home/home-routing.module';

@NgModule({
  declarations: [
    HeaderSidenavComponent
  ],
  exports:[
    HeaderSidenavComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HeaderSidenavModule { }
