import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  categories:any;

  updateCategory(event:any) {
    event.preventDefault();
    let categoryName = (<HTMLInputElement>document.getElementById('category')).value;
    let newCategoryName = (<HTMLInputElement>document.getElementById('name')).value;
    

    let categoryID:any;
    for(let category of this.categories) {
      if(category.categoryName == categoryName) {
        categoryID = category.categoryID;
        break;
      }
    }

  

    this.http.put('http://localhost:62044/api/Categories/' + categoryID, {
      categoryID: categoryID,
      categoryName: newCategoryName
    }).subscribe(data => window.location.href = 'http://localhost:4200/');

  }

  constructor(private http: HttpClient) {
    
  }


  ngOnInit(): void {
    this.http.get('http://localhost:62044/api/Categories').subscribe(data => this.categories = data);
  }

}
