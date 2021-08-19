
import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ItemComponent } from './item/item.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {

  locationUrl = '';
  title = 'ItemShopAng';
  items:any;
  categories:any;
  searchText:any;
  minPrice:any;
  maxPrice:any;
  category:any;
  constructor(private http: HttpClient, public route: Router) {
    
  }




   checkIfAdmin() {
    let userId = localStorage.getItem('loggedIn');
    if(userId == null) {
      return false;
    } else {
      let role = localStorage.getItem('role');
      if (role == "1") {
        return true;
      } else {
        return false;
      }
    }
  }


  //remove items list on paths /items/:id /login /register /user /additem /updateitem /deleteitem
  notItems(word:string) {
    var regex = /\d/g;
    return regex.test(word) || word.includes("cart") || word.includes("login") || word.includes("user") || word.includes("register")
    || word.includes("additem") || word.includes("updateitem") || word.includes("deleteitem") ||  word.includes("deletecategory") ||  word.includes("updatecategory") ||  word.includes("addcategory");
    
  }

  //check if user is logged in
  loggedIn = function() {
    if(localStorage.getItem('loggedIn') !== null && localStorage.getItem('loggedIn') !== undefined) {
      return true;
    }

    return false;
  }


  //logout user, delete cart
  logout() {

    let keysToRemove = []

    let userID = localStorage.getItem('loggedIn');
     
    for(let i = 0; i < localStorage.length; i++) {

      let key = localStorage.key(i);
      console.log(key)
      if(key !== undefined && key !== null) {
       keysToRemove.push(key);
      }
    }

    for(let i = 0; i <keysToRemove.length; i++) {
      localStorage.removeItem(keysToRemove[i]);
    } 

    this.http.get('http://localhost:62044/api/Users/' + userID).subscribe((data:any) => {
      let user = data;

      this.http.put('http://localhost:62044/api/Users/' + userID, {
        userID: userID,
        firstName: user.firstName,
        lastName: user.lastName,
        dateOfBirth: user.dateOfBirth,
        email: user.email,
        password: user.password,
        userType: user.userType,
        orders: user.orders,
        cart: ""
      }).subscribe(data => window.location.href = 'http://localhost:4200/');
    })
    
    
  } 

  isTheSameCategory(catID:string) {
    let filterList = <HTMLInputElement>document.getElementById('filterList');
    if(filterList.value == "All") {
      return true;
    }
    let categoryID:any;
    for(let category of this.categories) {
      if(category.categoryName == filterList.value) {
        categoryID = category.categoryID;
      }
    }

    if(categoryID == catID) {
      return true;
    } else {
      return false;
    }
  }

  

  
  
 


  ngOnInit(): void {
    this.http.get('http://localhost:62044/api/Categories').subscribe(data => {
      this.categories = data;
      console.log(this.categories);
      this.http.get('http://localhost:62044/api/Items').subscribe((data:any) => {
        this.items = data;
        console.log(this.items)
        for(let item of this.items) {
          for(let category of this.categories) {
            if(item.categoryID == category.id) {
              item.categoryName = category.categoryName;
            }
          }
        }

       
      })
  })
    this.locationUrl = window.location.pathname; //get current url
   
  }

  
  
  
}

