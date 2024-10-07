import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { UserService } from '../services/userService/user-service.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = {
    username: '',
    email: '',
    password: ''
  };

  constructor(private userService: UserService, private route: Router) {}

  onSubmit() {
    if (this.isFormValid()) {
      this.userService.registerUser(this.user).subscribe(
        response => {
          console.log('User registered successfully!', response);
          this.route.navigate(['']);
        },
        error => {
          console.error('Error registering user', error);
        }
      );
    }
  }

  isFormValid(): boolean {
    return this.user.username && this.user.email && this.user.password && this.isEmailValid(this.user.email);
  }

  isEmailValid(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
}
