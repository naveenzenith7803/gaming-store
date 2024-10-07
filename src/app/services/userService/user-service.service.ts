import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8082/api/users'; // Change this to your actual backend URL

  constructor(private http: HttpClient) {}

  registerUser(user: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }
}
