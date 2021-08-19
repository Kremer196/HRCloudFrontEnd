import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent implements OnInit {

  categories:any;

  constructor(private http: HttpClient) {
    
  }

  deleteCategory(event:any) {
    event.preventDefault();
    let categoryName = (<HTMLInputElement>document.getElementById('category')).value;


    let categoryID:any;

    for(let category of this.categories) {
      if(category.categoryName == categoryName) {
        categoryID = category.id;
        break;
      }
    }

    this.http.delete('http://localhost:62044/api/Categories/' + categoryID).subscribe(data => window.location.href = "http://localhost:4200/");

  }

  ngOnInit(): void {
    this.http.get('http://localhost:62044/api/Categories').subscribe(data => this.categories = data);
  }

}
