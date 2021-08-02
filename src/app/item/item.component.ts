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
      let oldCart = this.user.cart;
      console.log(oldCart);
      let oldItem = false;
      if(oldCart != "") {
        let oldCartArray = oldCart.split("#");
        let index = 0;
        let itemId = "";
        let newCount = "";
        for(let i = 0; i < oldCartArray.length-1; i++) {
          let oldCartItemArray = oldCartArray[i].split("$");
          if(oldCartItemArray[0] == itemToAdd) {
            oldItem = true;
            oldCartItemArray[1] = Number(oldCartItemArray[1]) + 1;
            itemId = oldCartItemArray[0];
            newCount = oldCartItemArray[1];
            break;
          }
          index++;
        }
        oldCartArray[index] = itemId + "$" + newCount;
        console.log(oldCartArray); 
    
        let updatedCart = oldCartArray.join("#");
        this.http.put('http://localhost:62044/api/Users/' + loggedIn, {
          userID: loggedIn,
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          dateOfBirth: this.user.dateOfBirth,
          email: this.user.email, 
          password: this.user.password,
          userType: this.user.userType,
          orders: this.user.orders,
          cart: updatedCart
        }).subscribe();
       
        if(!oldItem) {
          let newCart = (oldCart + itemToAdd + "$" + 1 + "#").trim();
          this.http.put('http://localhost:62044/api/Users/' + loggedIn, {
              userID: loggedIn,
              firstName: this.user.firstName,
              lastName: this.user.lastName,
              dateOfBirth: this.user.dateOfBirth,
              email: this.user.email, 
              password: this.user.password,
              userType: this.user.userType,
              orders: this.user.orders,
              cart: newCart
          }).subscribe();
        }
      } else { 
          let newCart = (oldCart + itemToAdd + "$" + 1 + "#").trim(); 
          this.http.put('http://localhost:62044/api/Users/' + loggedIn, {
            userID: loggedIn,
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            dateOfBirth: this.user.dateOfBirth,
            email: this.user.email, 
            password: this.user.password,
            userType: this.user.userType,
            orders: this.user.orders,
            cart: newCart
          }).subscribe();
      }
    
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
          if(category.categoryID == this.item.categoryID) {
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
