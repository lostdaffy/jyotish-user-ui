import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LatestPostComponent } from './latest-post.component';



@NgModule({
  declarations: [
    LatestPostComponent
  ],
  exports: [
    LatestPostComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LatestPostModule { }
