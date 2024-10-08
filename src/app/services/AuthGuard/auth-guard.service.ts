// role.guard.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole']; // Get expected role from route data
    const role = localStorage.getItem('role'); // Get the role from localStorage

    if (role === expectedRole) {
      return true; // Allow access
    } else {
      alert('you are not a Admin');
      this.router.navigate(['/login']); // Redirect to login if not authorized
      return false; // Deny access
    }
  }

  private userLoggedInSource = new Subject<void>();
  userLoggedIn$ = this.userLoggedInSource.asObservable();

  notifyUserLoggedIn() {
    this.userLoggedInSource.next();
  }
}
