import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserType } from '../user/user.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errors:any[] = [];
  constructor(private http: HttpClient) {
    
  }


  // manual form validation for registering a user
  registerUser(event: any) {
    let users;
    event.preventDefault();
    const first = event.target.querySelector('#first').value;
    const last = event.target.querySelector('#last').value;
    const email = event.target.querySelector('#email').value;
    const birthDate = event.target.querySelector('#birth').value;
    const password = event.target.querySelector('#password').value;
    const confirm = event.target.querySelector('#confirm').value;

 

    this.http.get('http://localhost:62044/api/Users').subscribe((data:any) => {
        users = data;
        let matches = false;
       for(let user of users) {
          if(user.email == email) {            // checking if a user with the same email already exists
            matches = true;
            
            this.errors.push("User with the same email already exists.")
            break;
          } 
        }
        if(password != confirm) {
          this.errors.push("Passwords do not match");  // checking if the passwords matchs
        } else if (!matches) {
          this.http.post('http://localhost:62044/api/Users', {
            firstName: first,
            lastName: last,
            dateOfBirth: birthDate,
            email: email,
            password: password,
            userType:UserType.User
          }).subscribe(() => {
            window.location.href = 'http://localhost:4200/login'; //refirecting user to login
          });
          
        }
    });
  }

  ngOnInit(): void {
  }

}
