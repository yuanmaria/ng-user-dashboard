import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models/user';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers() : Observable<User[]> {
    // mock error
    // return throwError(new Error("mock error"));
    return this.http.get<User[]>("https://jsonplaceholder.typicode.com/users");
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(
      "https://jsonplaceholder.typicode.com/users/" + userId
    );
  }
}
