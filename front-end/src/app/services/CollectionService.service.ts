import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  private apiUrl = 'http://localhost:8080/api/users/collezione'; 

  constructor(private http: HttpClient) {}

 modificaCollezione(collection: any[]): Observable<any> {
    return this.http.put(this.apiUrl, collection);
  }
}
