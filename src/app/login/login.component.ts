import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CartComponent } from '../cart/cart.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  errors:any[] = [];

  
  constructor(private http: HttpClient) {
    
  }

  //manual form validation for user login
  loginUser(event: any) {
    let users;
    event.preventDefault();
    console.log("Here");
    const email = event.target.querySelector('#email').value;
    const password =  event.target.querySelector('#password').value;
    
    this.http.get('http://localhost:62044/api/users').subscribe((data:any) => {
      this.errors = [];
      users = data;
      let matchesEmail = false;
      for (let user of  users) {
        if(user.email == email) {           // checking if person with the emails match
          matchesEmail = true;
          if(user.password == password) {     // checking if the passwords match
            localStorage.setItem('loggedIn', user.id);
            localStorage.setItem('role', user.userType);
            window.location.href = 'http://localhost:4200/Items';
          } else {
            this.errors.push("Incorrect password.");
          }
          break;
        }
      }
      if(!matchesEmail) {                           
        this.errors.push("Non existing email.");
      }
     

      
      
    });
    
  }

  ngOnInit(): void {
    
  }

}
