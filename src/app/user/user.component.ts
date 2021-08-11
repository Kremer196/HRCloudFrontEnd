import { getLocaleDateFormat } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserModel } from './user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user:any;
  orders:any[] = [];
  constructor(private http: HttpClient) { }

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

  //getting user information
  ngOnInit(): void {
    let id = localStorage.getItem('loggedIn');
    this.http.get('http://localhost:62044/api/users/' + id).subscribe((data:any) => {
      let userID = data.userID;
      let firstName = data.firstName;
      let lastName = data.lastName;
      let birthDate = data.dateOfBirth.split("T")[0];
      let email = data.email;
      this.user = new UserModel(userID, firstName, lastName, birthDate, email);

      this.http.get('http://localhost:62044/api/Orders/' + userID + '/list').subscribe((data:any) => {
        let orderedItems = data;

        for(let item of orderedItems) {
          this.http.get('http://localhost:62044/api/Items/' + item.itemID).subscribe((data:any) => {
            let itemO = data;

            let order = []

            order.push(itemO.itemName);
            order.push(itemO.itemPrice);
            order.push(item.quantity);
            order.push(item.dateOfPurchase.split("T")[0]);

            this.orders.push(order);

          })
        }
      })
    })
  }

}
