import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiConversorResult } from '../types/ApiConversorResult';

@Injectable({
  providedIn: 'root',
})
export class ConversorService {
  constructor(private http: HttpClient) {}

  getConversorData(): Observable<ApiConversorResult> {
    return this.http.get<ApiConversorResult>(`${environment.apiConversorUrl}`);
  }
}
