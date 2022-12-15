import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../types/LoginResponse';
import { LoginRequest } from '../types/LoginRequest';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  login(user: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${environment.apiUrl}/api/auth`,
      user,
      this.httpOptions
    );
  }
}
