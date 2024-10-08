import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/userService/user-service.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CartComponent } from '../cart/cart.component';
import { AuthGuard } from '../services/AuthGuard/auth-guard.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    username: '',
    email: '',
    password: ''
  };

  constructor(private userService: UserService, private route: Router, private authguard: AuthGuard) {}

  

  

  signUp() {
    if (this.isSignUpFormValid()) {
      this.userService.registerUser(this.user).subscribe(
        response => {
          console.log('User registered successfully!', response);
          alert('registration successful!');
          this.route.navigate(['/login']); // Redirect after successful registration
        },
        error => {
          console.error('Error registering user', error);
        }
      );
    }
  }

  login() {
    this.userService.loginUser(this.user.email, this.user.password).subscribe(
      response => {
        console.log('Login successful!', response);
        alert('Login successful!');
        this.authguard.notifyUserLoggedIn();
        // Handle successful login (e.g., store token, redirect user)
        localStorage.setItem('role', response.role);
        localStorage.setItem('userName',response.userName); // Assuming the API returns a token
        this.userService.setUserId(response.userId);
        // this.route.navigate(['/home']); // Redirect to the dashboard or home page
      },
      error => {
        console.error('Error logging in', error);
        // Handle error (e.g., show an error message to the user)
      }
    );
  
  }

  isSignUpFormValid(): boolean {
    return (
      this.user.username &&
      this.user.email &&
      this.user.password &&
      this.isEmailValid(this.user.email)
    );
  }

  isEmailValid(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
}
