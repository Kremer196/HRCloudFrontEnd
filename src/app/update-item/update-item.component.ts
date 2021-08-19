import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css']
})
export class UpdateItemComponent implements OnInit {

  categories:any
  items:any

  constructor(private http: HttpClient) {
    
  }

  updateItem(event:any) {
    event.preventDefault();
    let itemName = (<HTMLInputElement>document.getElementById('item')).value;
    let newItemName = (<HTMLInputElement>document.getElementById('name')).value;
    let categoryName = (<HTMLInputElement>document.getElementById('category')).value;
    let price = (<HTMLInputElement>document.getElementById('price')).value;
    let imageURL = (<HTMLInputElement>document.getElementById('image')).value;

    let itemID:any;
    for(let item of this.items) {
      if(item.itemName == itemName) {
        itemID = item.id;
        break;
      }
    }

    let categoryId:any;
    
    for(let category of this.categories) {
      if(category.categoryName == categoryName) {
        categoryId = category.id;
        break;
      }
    }

    this.http.put('http://localhost:62044/api/Items/' + itemID, {
      id: itemID,
      itemName: newItemName,
      categoryID: categoryId,
      itemPrice: price,
      itemImageURL: imageURL
    }).subscribe(data => window.location.href = 'http://localhost:4200/');

  }
  

  ngOnInit(): void {
    this.http.get('http://localhost:62044/api/Items').subscribe((data:any) => this.items = data);
    this.http.get('http://localhost:62044/api/Categories').subscribe((data:any) => this.categories = data);
  }

}
