import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../types/User';
import { UserResponse } from '../types/UserResponse';
import { UsersResponse } from '../types/UsersResponse';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${window.localStorage.getItem('_token')}`,
    }),
  };

  constructor(private http: HttpClient) {}

  get(page: number): Observable<UsersResponse> {
    console.log(
      `${environment.apiUrl}/api/users?paginate=1&page=${page}&sort=last_name,mothers_last_name,first_name`
    );

    return this.http.get<UsersResponse>(
      `${environment.apiUrl}/api/users?paginate=1&page=${page}&sort=last_name,mothers_last_name,first_name`,
      this.httpOptions
    );
  }

  show(id: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(
      `${environment.apiUrl}/api/users/${id}`,
      this.httpOptions
    );
  }

  post(user: User): Observable<UserResponse> {
    return this.http.post<UserResponse>(
      `${environment.apiUrl}/api/users`,
      user,
      this.httpOptions
    );
  }

  put(id: string, user: User): Observable<UserResponse> {
    return this.http.put<UserResponse>(
      `${environment.apiUrl}/api/users/${id}`,
      user,
      this.httpOptions
    );
  }

  delete(id: string): Observable<UserResponse> {
    return this.http.delete<UserResponse>(
      `${environment.apiUrl}/api/users/${id}`,
      this.httpOptions
    );
  }
}
