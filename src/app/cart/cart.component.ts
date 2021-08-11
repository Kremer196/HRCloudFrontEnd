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
  notEmpty:any;
  errors:any[] = [];
  user:any;
  
  constructor(private http: HttpClient) { }


  // checking if cart is empty
  notEmptyFunction() {
    if(this.notEmpty) {
      return true;
    }

    return false;
  }


  // increasing the number in text field and updating local storage
   plusFunction(id:number, event:any) {
    event.preventDefault();
    document.querySelectorAll('div .item-container').forEach((key, value) => {
      let idToCompare = key.querySelector('.plus-minus-container')?.getAttribute('id');
      if(idToCompare !== null && idToCompare !== undefined) {
        if(parseInt(idToCompare) === id) {
          let field = (<HTMLInputElement>key.querySelector('.field'));
          if(field !== null && field !== undefined) {
           let price = (<HTMLElement>key.querySelector('#price')).textContent?.split(" ")[1];
           console.log(price);
           if(price !== undefined) {
              let a = "" + (parseInt(field.value) + 1)
              this.totalPrice += parseInt(price); // updating total price
              field.value = a;
              
              
              let userID = localStorage.getItem('loggedIn');
              
              this.http.put('http://localhost:62044/api/Carts/' + userID + '/' + id + '/plus', {
                userID: userID,
                cartItems: [{itemID: id}]
              }).subscribe(data => console.log("putted"))
              
         }
        }
        }
      }
    })
  }


   // decreasing the number in text field and updating local storage
  minusFunction (id:number, event:any) {
    event.preventDefault();
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
                 
                  
                }

              let userID = localStorage.getItem('loggedIn');
              
              this.http.put('http://localhost:62044/api/Carts/' + userID + '/' + id + '/minus', {
                userID: userID,
                cartItems: [{itemID: id}]
              }).subscribe()
              
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
      let previousOrders = this.http.get('http://localhost:62044/api/Orders/' + userLoggedIn + '/list');
      for(let item of this.cartItems) {
        let today = new Date();
        let month = today.getMonth() + 1
        let todayDate = today.getFullYear() + "-"   + month + "-" + today.getDate() + "T" + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        console.log(todayDate);
       

        previousOrders.toPromise()
          .then(res => {
            this.http.put('http://localhost:62044/api/Orders/' + userLoggedIn, {
              userID: userLoggedIn,
              orderedItems: [{itemID: item.itemID, dateOfPurchase: todayDate, quantity: item.itemCount}]
            }).toPromise().catch(err => console.log(err));
          // .subscribe(data => console.log("response put"));
          })
          .catch(err => {
            this.http.post('http://localhost:62044/api/Orders/', {
              userID: userLoggedIn,
              orderedItems: [{itemID: item.itemID, dateOfPuchase: todayDate, quantity: item.itemCount}]
            }).subscribe(data => console.log("error post"));
          })

       
      }
    }


  }

 

  


  //creating cart item details
  ngOnInit(): void {
    this.totalPrice = 0;
    
      let userID = localStorage.getItem("loggedIn");
      
      let userCart =  this.http.get('http://localhost:62044/api/Carts/' + userID + '/list');
      userCart.toPromise().then(res => {
        userCart.subscribe((data:any) => {
          for(let cartItem of data) {
            this.notEmpty = true;
            this.http.get('http://localhost:62044/api/Items/' + cartItem.itemID).subscribe((data:any) => {
              let itemID = Number(data.itemID);
              let itemName = data.itemName;
              let categoryID = Number(data.categoryID);
              let itemPrice = Number(data.itemPrice);
              let itemImageURL = data.itemImageURL;
              let itemCount = Number(cartItem.quantity);

              this.totalPrice += itemPrice * itemCount;

              this.cartItems.push(new CartItem(itemID, itemName, categoryID, itemPrice, itemImageURL, itemCount));
            })
          }
        })
      }).catch(err => {

      })
  
  }
     
}



    
    

