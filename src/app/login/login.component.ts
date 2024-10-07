import { CommonModule, NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgClass,CommonModule,NgIf,NavbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  onLogin(form: any) {
    console.log('Login form submitted', form);
  }

  onSignUp(form: any) {
    console.log('Sign-up form submitted', form);
  }
}
