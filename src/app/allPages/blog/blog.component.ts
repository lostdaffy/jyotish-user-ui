import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogData:any;
  imgUrl:any= environment.imgUrl;
  constructor(private apiService:ApiService) {
    
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
  }

  
  blogs(){
    this.apiService.get('blogs').subscribe((res:any)=>{
      this.blogData=res.data.data
    })
  }

}
