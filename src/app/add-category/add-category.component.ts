import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  constructor(private http: HttpClient) {
    
  }

  addCategory(event:any) {
    event.preventDefault();
    let name = (<HTMLInputElement>document.getElementById('name')).value;

    

    this.http.post('http://localhost:62044/api/Categories', {
     categoryName:name
    }).subscribe(data => window.location.href = "http://localhost:4200/");

  }

  ngOnInit(): void {
  }

}
