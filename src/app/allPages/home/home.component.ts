import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/service/api.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  blogData:any;
  imgUrl:any= environment.imgUrl;
  constructor(private apiService:ApiService) {
    
   }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay:true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: true
  }
  slides = [
    {id: 1, img: "../../../assets/images/blog1.jpg"},
    {id: 2, img: "../../../assets/images/blog2.png"},
    {id: 3, img: "../../../assets/images/blog3.jpg"},
    {id: 4, img: "../../../assets/images/blog1.jpg"},
    {id: 5, img: "../../../assets/images/blog2.png"},
    {id: 6, img: "../../../assets/images/blog3.jpg"},
    {id: 7, img: "../../../assets/images/blog2.png"}
  ];

  ngOnInit(): void {
    this.blogs()
  }

  blogs(){
    this.apiService.get('blogs').subscribe((res:any)=>{
      this.blogData=res.data.data
    })
  }

}
