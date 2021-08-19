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

  
  // adding itemId to localStorage
  addToCart(event:any) {
  
  event.preventDefault();
  const loggedIn = localStorage.getItem('loggedIn');
  const itemToAdd = document.getElementById('id')?.textContent?.trim();
  if(itemToAdd !== null && itemToAdd !== undefined) {     
    if(loggedIn !== null) {
      let empty = false;
      let cart = this.http.get('http://localhost:62044/api/Carts/' + loggedIn + '/list');
      cart.toPromise().then(res => {
        cart.subscribe((data:any) => {
          if(data.length == 0) {
            empty = true;
          }
          let oldItem = false;
          let userCart = data;
          for(let item of userCart) {
            if(item.itemID == Number(itemToAdd)) {
              oldItem = true;
              this.http.put('http://localhost:62044/api/Carts/' + loggedIn + '/' + itemToAdd + '/plus', {
                userID: loggedIn,
                cartItems: [{itemID: Number(itemToAdd)}]
              }).subscribe(data => console.log("putted"));
              break;
            }
          }

        
          let postCartItem = this.http.post('http://localhost:62044/api/CartItems', {
            itemID: itemToAdd
          });
          
          postCartItem.toPromise()
            .then(res => {
              postCartItem.subscribe(data => console.log("posted cartitem"));
            })
            .catch(err => {
              console.log("caught");
            });
         
        
         
         if (!oldItem) {
            console.log("new");
            let putCartItem =  this.http.put('http://localhost:62044/api/Carts/' + loggedIn, {
              userID: loggedIn,
              cartItems: [{itemID: Number(itemToAdd), quantity: 1}]
            });
            putCartItem.toPromise()
              .then(res => {
                putCartItem.subscribe(data => console.log("putted new"));
              })
              .catch(err => {
                this.http.delete('http://localhost:62044/api/CartItems/' + itemToAdd).subscribe(data => {
                  putCartItem.subscribe(data => console.log("putted after deletion"));
                })
              })
            
          }
        
        })
      }).catch(err => {
        let postCartItem = this.http.post('http://localhost:62044/api/CartItems', {
            itemID: itemToAdd
          });

          postCartItem.toPromise()
          .then(res => {
            postCartItem.subscribe(data => console.log("posted cartitem"));
          })
          .catch(err => {

          });
        
        this.http.post('http://localhost:62044/api/Carts', {
          userID: loggedIn 

        }).subscribe(data => console.log("posted"));
      })
    
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
 