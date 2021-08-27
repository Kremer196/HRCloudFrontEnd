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
  user:any;

  constructor(private http: HttpClient) { }

  
  
  addToCart(event:any) {
  
  event.preventDefault();
  const loggedIn = localStorage.getItem('loggedIn');
  const itemToAdd = document.getElementById('id')?.textContent?.trim();
  if(itemToAdd !== null && itemToAdd !== undefined) {     
    if(loggedIn !== null) {
      let itemPost = this.http.post('http://localhost:62044/api/Carts', {
        id: loggedIn,
        itemID: itemToAdd,
        quantity: 1
      });

      itemPost.toPromise()
        .then(res => itemPost.subscribe(data => console.log("posted")))
        .catch(err => {
          this.http.put('http://localhost:62044/api/Carts/' + loggedIn + '/' + itemToAdd + '/plus', {
            id: loggedIn,
            itemID: itemToAdd
          }).subscribe(data => console.log("putted"))
        });
      
    
  }  else {
    window.location.href = 'http://localhost:4200/login';
  }   
   
  }
 
}

 
  ngOnInit(): void {
    this.id = window.location.href.split('/')[window.location.href.split('/').length-1]; // getting itemId through page url
    this.http.get('http://localhost:62044/api/Categories').subscribe(data => {
      this.categories = data;
      this.http.get('http://localhost:62044/api/Items/' + this.id).
      subscribe((data:any) => {
        this.item = data; 
        for(let category of this.categories) {
          if(category.id == this.item.categoryID) {
            this.item.categoryName = category.categoryName;
          }
        }
      });
    })

    const loggedIn = localStorage.getItem('loggedIn');
    if(loggedIn !== null) {
      this.http.get('http://localhost:62044/api/Users/' + loggedIn).subscribe((data:any) => {
        this.user = data;
      //  console.log(this.user);
      })
    }
    
   
    
   

  }

 

}
 