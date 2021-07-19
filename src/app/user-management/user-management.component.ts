import { keyframes } from '@angular/animations';
import { KeyValuePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserType } from '../user/user.enum';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  users:any = [];
  roles:any[] = [];
  
  saveChanges(event:any) {
    event.preventDefault();
    let map = new Map();
    document.querySelectorAll('.user-container').forEach((value, key) => {
      let userID = value.getAttribute('id');
      let role = (<HTMLInputElement>value.querySelector('.role')).value;
      for(let user of this.users) {
        if(user.userID == userID && user.typeString != role) {
          let newRole = UserType.User;
          if(role == "Admin") {
            newRole = UserType.Admin;
          }
          this.http.put('http://localhost:62044/api/Users/' + userID, {
            userID: userID,
            firstName: user.firstName,
            lastName: user.lastName,
            dateOfBirth: user.dateOfBirth,
            email: user.email,
            password: user.password,
            orders: user.orders,
            userType: newRole
          }).subscribe((data) => window.location.href = 'http://localhost:4200/');
          break;
        }
      }

      
    })
   
  }

  constructor(private http: HttpClient) {  }

  ngOnInit(): void {
    let adminID = localStorage.getItem('loggedIn');
    this.http.get('http://localhost:62044/api/Users').subscribe((data:any) => {
      for(let user of data) {
        if(user.userID != adminID) {
          if(user.userType == "2") {
            user.typeString = "User"
            user.otherRoles = []
            for(let role in UserType) {
              if(isNaN(Number(role)) && user.typeString != role) {
                user.otherRoles.push(role);
              }
            }
            this.users.push(user);
          }
        }
       }

       let userDiv = document.getElementById('19')

    
    });
    
    
  }

}
