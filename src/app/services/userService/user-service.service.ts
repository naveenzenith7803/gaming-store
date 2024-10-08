import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8082/api/users'; // Change this to your actual backend URL

  private userIdSubject = new BehaviorSubject<number | null>(null);
  userId$ = this.userIdSubject.asObservable();

  setUserId(userId: number) {
    localStorage.setItem('userId', userId.toString());
    this.userIdSubject.next(userId);
  }

  constructor(private http: HttpClient) {}

  registerUser(user: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  loginUser(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  logout() {
    localStorage.removeItem('role'); // Clear role
    localStorage.removeItem('userId'); // Redirect to login
    this.userIdSubject.next(null);
  }
   
  

  
}
