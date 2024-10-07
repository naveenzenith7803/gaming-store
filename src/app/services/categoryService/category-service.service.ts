import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../models/categoryModel/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:8082/api/categories'; 

  constructor(private http: HttpClient) {}

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }

  getAllCategories():Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }
}
