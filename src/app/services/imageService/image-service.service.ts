import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from '../../models/imageModel/image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private apiUrl = 'http://localhost:8082/api/images'; 

  constructor(private http: HttpClient) {}

  getImageById(id: number): Observable<Image> {
    return this.http.get<Image>(`${this.apiUrl}/${id}`);
  }

  getAllImages(): Observable<Image[]> {
    return this.http.get<Image[]>(this.apiUrl);
  }
}
