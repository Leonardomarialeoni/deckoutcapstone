import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { text } from 'stream/consumers';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';
  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public user$: Observable<any> = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/users/login`, credentials).pipe(
      tap(user => {
        this.userSubject.next(user);
      })
    );
  }

  signup(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/users/register`, data, {responseType: "text"});
  }

  logout() {
    this.userSubject.next(null);
  }

  setCurrentUser(user: any) {
    this.userSubject.next(user);
  }
}
