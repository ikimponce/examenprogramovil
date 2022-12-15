import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Attendance } from '../types/Attendance';
import { AttendanceResponse } from '../types/AttendanceResponse';
import { AttendancesResponse } from '../types/AttendancesResponse';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${window.localStorage.getItem('_token')}`,
    }),
  };

  constructor(private http: HttpClient) {}

  getUser(userId: string, page: number): Observable<AttendancesResponse> {
    console.log(
      `${environment.apiUrl}/api/attendance?paginate=1&page=${page}&sort=-fecha`
    );

    return this.http.get<AttendancesResponse>(
      `${environment.apiUrl}/api/attendance?paginate=1&page=${page}&sort=-fecha`,
      this.httpOptions
    );
  }

  get(page: number): Observable<AttendancesResponse> {
    console.log(
      `${environment.apiUrl}/api/attendance?paginate=1&page=${page}&sort=l-fecha`
    );

    return this.http.get<AttendancesResponse>(
      `${environment.apiUrl}/api/attendance?paginate=1&page=${page}&sort=-fecha`,
      this.httpOptions
    );
  }

  show(id: string): Observable<AttendanceResponse> {
    return this.http.get<AttendanceResponse>(
      `${environment.apiUrl}/api/attendance/${id}`,
      this.httpOptions
    );
  }

  post(attendance: Attendance): Observable<AttendanceResponse> {
    return this.http.post<AttendanceResponse>(
      `${environment.apiUrl}/api/attendance`,
      attendance,
      this.httpOptions
    );
  }

  put(id: string, attendance: Attendance): Observable<AttendanceResponse> {
    return this.http.put<AttendanceResponse>(
      `${environment.apiUrl}/api/attendance/${id}`,
      attendance,
      this.httpOptions
    );
  }

  delete(id: string): Observable<AttendanceResponse> {
    return this.http.delete<AttendanceResponse>(
      `${environment.apiUrl}/api/attendance/${id}`,
      this.httpOptions
    );
  }
}
