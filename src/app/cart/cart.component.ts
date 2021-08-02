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
              //localStorage.removeItem(JSON.parse(JSON.stringify(id)));
              //localStorage.setItem(JSON.parse(JSON.stringify(id)), a);
              this.http.get('http://localhost:62044/api/Users/' + this.user.userID).subscribe((data:any) => {
              let oldCart = data.cart;
              console.log(oldCart);
              if(oldCart != "") {
                let oldCartArray = oldCart.split("#");
                let index = 0;
                let itemId = "";
                let newCount = "";
                for(let i = 0; i < oldCartArray.length-1; i++) {
                  let oldCartItemArray = oldCartArray[i].split("$");
                  if(Number(oldCartItemArray[0]) == id) {
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
                this.http.put('http://localhost:62044/api/Users/' + this.user.userID, {
                  userID: this.user.userID,
                  firstName: this.user.firstName,
                  lastName: this.user.lastName,
                  dateOfBirth: this.user.dateOfBirth,
                  email: this.user.email, 
                  password: this.user.password,
                  userType: this.user.userType,
                  orders: this.user.orders,
                  cart: updatedCart
                }).subscribe();

               
          }
        })
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
             // localStorage.removeItem(JSON.parse(JSON.stringify(id)));
             // localStorage.setItem(JSON.parse(JSON.stringify(id)), a);
             this.http.get('http://localhost:62044/api/Users/' + this.user.userID).subscribe((data:any) => {
             let oldCart = data.cart;
             console.log(oldCart);
             if(oldCart != "") {
               let oldCartArray = oldCart.split("#");
               let index = 0;
               let itemId = "";
               let newCount = "";
               for(let i = 0; i < oldCartArray.length-1 && oldCartArray[i] !== ""; i++) {
                 let oldCartItemArray = oldCartArray[i].split("$");
                 if(Number(oldCartItemArray[0]) == id && Number(oldCartItemArray[1]) > 0) {

                   oldCartItemArray[1] = Number(oldCartItemArray[1]) - 1;
                   itemId = oldCartItemArray[0];
                   newCount = oldCartItemArray[1];
                   console.log(newCount)
                   break;
                 }
                 index++;
               }
               let updatedCart = "";
               if(Number(newCount) !== 0) {
                oldCartArray[index] = itemId + "$" + newCount;
                console.log(oldCartArray); 
                updatedCart = oldCartArray.join("#");
               } else {
                 oldCartArray[index] = "".trim();    

                }
           
              
               this.http.put('http://localhost:62044/api/Users/' + this.user.userID, {
                 userID: this.user.userID,
                 firstName: this.user.firstName,
                 lastName: this.user.lastName,
                 dateOfBirth: this.user.dateOfBirth,
                 email: this.user.email, 
                 password: this.user.password,
                 userType: this.user.userType,
                 orders: this.user.orders,
                 cart: updatedCart
               }).subscribe();
              
         }
        }) 
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
          orders: allOrders,
          cart: ""
        }).subscribe((data) => {
          window.location.href = 'http://localhost:4200/'; // redirecting to another page
        });
      })
      

      //clearing database bought items 
    
      
    
    

   
   

    }


  }

  


  //creating cart item details
  ngOnInit(): void {
    this.totalPrice = 0;
    
      let userID = localStorage.getItem("loggedIn");
      this.http.get('http://localhost:62044/api/Users/' + userID).subscribe((data:any) => {

        this.user = data;
        

        let array = this.user.cart.split("#")
       

        for(let i = 0; i < array.length-1; i++) {
          this.notEmpty = true;
          let itemArray = array[i].split("$");
          this.http.get('http://localhost:62044/api/Items/' + itemArray[0]).subscribe((data: any) => {
       
            this.countItem = Number(itemArray[1]);
            let itemID = data.itemID;
            let itemName = data.itemName;
            let categoryID = data.categoryID;
            let itemPrice = data.itemPrice;
            let itemImageURL = data.itemImageURL;
  
            this.totalPrice += this.countItem * itemPrice;          
            this.cartItems.push(new CartItem(itemID, itemName, categoryID, itemPrice, itemImageURL, parseInt(this.countItem)));
  
            console.log(this.cartItems);});
          
        }
         
      })
  
  }
     
}



    
    
