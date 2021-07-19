import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  categories:any;

  constructor(private http: HttpClient) {
    
  }

  addItem(event:any) {
    event.preventDefault();
    let name = (<HTMLInputElement>document.getElementById('name')).value;
    let categoryName = (<HTMLInputElement>document.getElementById('category')).value;
    let price = (<HTMLInputElement>document.getElementById('price')).value;
    let imageURL = (<HTMLInputElement>document.getElementById('image')).value;

    let categoryId:any;
    
    for(let category of this.categories) {
      if(category.categoryName == categoryName) {
        categoryId = category.categoryID;
        break;
      }
    }

    this.http.post('http://localhost:62044/api/Items', {
      itemName: name,
      categoryID: categoryId,
      itemPrice: price,
      itemImageURL: imageURL
    }).subscribe(data => window.location.href = "http://localhost:4200/");

  }

  ngOnInit(): void {
    this.http.get('http://localhost:62044/api/Categories').subscribe((data:any) => this.categories = data)
  }

}
