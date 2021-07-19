import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartItem } from './cart.model';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];
  totalPrice: any;
  countItem: any;
  lsKey: any;
  notEmpty:any;
  errors:any[] = [];
  
  constructor(private http: HttpClient) { }


  // checking if cart is empty
  notEmptyFunction() {
    if(this.notEmpty) {
      return true;
    }

    return false;
  }


  // increasing the number in text field and updating local storage
   plusFunction(id:number) {
    document.querySelectorAll('div .item-container').forEach((key, value) => {
      let idToCompare = key.querySelector('.plus-minus-container')?.getAttribute('id');
      if(idToCompare !== null && idToCompare !== undefined) {
        if(parseInt(idToCompare) === id) {
          let field = (<HTMLInputElement>key.querySelector('.field'));
        // console.log((<HTMLInputElement>key.querySelector('.field'))?.value);
         if(field !== null && field !== undefined) {
           let price = (<HTMLElement>key.querySelector('#price')).textContent?.split(" ")[1];
           console.log(price);
           if(price !== undefined) {
              let a = "" + (parseInt(field.value) + 1)
              this.totalPrice += parseInt(price); // updating total price
              field.value = a;
              localStorage.removeItem(JSON.parse(JSON.stringify(id)));
              localStorage.setItem(JSON.parse(JSON.stringify(id)), a);
          }
         }
        }
      }
    })
  }


   // decreasing the number in text field and updating local storage
  minusFunction (id:number) {
    document.querySelectorAll('div .item-container').forEach((key, value) => {
      let idToCompare = key.querySelector('.plus-minus-container')?.getAttribute('id');
      if(idToCompare !== null && idToCompare !== undefined) {
        if(parseInt(idToCompare) == id) {
          let field = (<HTMLInputElement>key.querySelector('.field'));
         if(field !== null && field !== undefined) {
          let price = key.querySelector('#price')?.textContent?.split(" ")[1];
          if(price !== undefined) {
           if(parseInt(field.value) > 0) {
              let a = "" + (parseInt(field.value) - 1)
              this.totalPrice -= parseInt(price);  // updating total price
              field.value = a;
              localStorage.removeItem(JSON.parse(JSON.stringify(id)));
              localStorage.setItem(JSON.parse(JSON.stringify(id)), a);
              if (parseInt(field.value) == 0) {
                localStorage.removeItem(JSON.stringify(id))
               
              }
           }
          } 
          }
        }
      }
    })
  }

  // confirming the purchase adding purchase details to database
  validatePurchase(event:any) {
    event.preventDefault();
    
    let orderedItems = "";
    let userLoggedIn = localStorage.getItem('loggedIn');
    if(userLoggedIn === null) {
      this.errors.push("Must be logged in to confirm purchase");
    } else {
      this.http.get('http://localhost:62044/api/Users/' + userLoggedIn).subscribe((data:any) => {
        console.log(data);
        let allOrders = data.orders;
        document.querySelectorAll('.item-container').forEach((value, key) => {
          console.log(value);
          let item = (<HTMLElement>value.querySelector('#item')).textContent;
          let price = (<HTMLElement>value.querySelector('#price')).textContent;
          let count = (<HTMLInputElement>value.querySelector('#count')).value;

          let today = new Date();
          let month = today.getMonth() + 1
          let todayDate = today.getFullYear() + "-" + month + "-" + today.getDate();
      
          orderedItems += [item, price, count, todayDate] + "#";
      

          
        });
        allOrders += orderedItems;
        console.log(allOrders);
        this.http.put('http://localhost:62044/api/Users/' + userLoggedIn, { //updating orders of user
          userID: userLoggedIn,
          firstName: data.firstName,
          lastName: data.lastName,
          dateOfBirth: data.dateOfBirth,
          email: data.email,
          password: data.password,
          orders: allOrders
        }).subscribe((data) => {
          window.location.href = 'http://localhost:4200/'; // redirecting to another page
        });
      })
      

      //clearing localstorage bought items 
    let keysToRemove = [];
      
    for(let i = 0; i < localStorage.length; i++) {
      this.lsKey = localStorage.key(i);
     if(this.lsKey != null) {
       if(!isNaN(parseInt(this.lsKey))) {
         keysToRemove.push(this.lsKey);
       }
      }
    }

    for(let i = 0; i < keysToRemove.length; i++) {
      localStorage.removeItem(keysToRemove[i]);
    }

   

    }


  }

  


  //creating cart item details
  ngOnInit(): void {
    this.totalPrice = 0;
    

    for(let i = 0; i < localStorage.length; i++) {
     
      this.lsKey = localStorage.key(i);
     if(this.lsKey != null) {
       if(!isNaN(parseInt(this.lsKey))) {
        console.log(localStorage.getItem(this.lsKey))
        this.notEmpty = true;
         
        this.http.get('http://localhost:62044/api/Items/' + this.lsKey).subscribe((data: any) => {
          this.lsKey = localStorage.key(i);
          this.countItem = localStorage.getItem(this.lsKey);
          let itemID = data.itemID;
          let itemName = data.itemName;
          let categoryID = data.categoryID;
          let itemPrice = data.itemPrice;
          let itemImageURL = data.itemImageURL;

          this.totalPrice += this.countItem * itemPrice;          
          this.cartItems.push(new CartItem(itemID, itemName, categoryID, itemPrice, itemImageURL, parseInt(this.countItem)));

          console.log(this.cartItems);});
       }
     }
 
    }



    
    
}




}
