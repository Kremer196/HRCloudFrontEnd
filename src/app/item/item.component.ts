import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  id:any;
  item:any;
  categories:any;
  addBtn:any

  
  // adding itemId to localStorage
  addToCart() {
  const itemToAdd = document.getElementById('id')?.textContent;
  if(itemToAdd !== null && itemToAdd !== undefined) {           
    let currentItemCount = localStorage.getItem(itemToAdd.trim());
    if(currentItemCount == null) {
      localStorage.setItem(itemToAdd.trim(), JSON.stringify(1));
    } else {
      let newItemCount = parseInt(currentItemCount) + 1;
      localStorage.setItem(itemToAdd.trim(), JSON.stringify(newItemCount));
    }
  }
 
}

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.id = window.location.href.split('/')[window.location.href.split('/').length-1]; // getting itemId through page url
    this.http.get('http://localhost:62044/api/Categories').subscribe(data => {
      this.categories = data;
      this.http.get('http://localhost:62044/api/Items/' + this.id).
      subscribe((data:any) => {
        this.item = data; 
        for(let category of this.categories) {
          if(category.categoryID == this.item.categoryID) {
            this.item.categoryName = category.categoryName;
          }
        }
      });
    })
   
    this.addBtn = document.getElementById('addBtn');
    this.addBtn.addEventListener('click', this.addToCart);

  }

 

}
