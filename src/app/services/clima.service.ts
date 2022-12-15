import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiWeatherResult } from '../types/ApiWeatherResult';

@Injectable({
  providedIn: 'root',
})
export class ClimaService {
  constructor(private http: HttpClient) {}

  getWeather(lat: number, lon: number): Observable<ApiWeatherResult> {
    const url = `${environment.apiWeatherUrl}lat=${lat}&lon=${lon}&appid=${environment.weatherApiKey}&lang=es&units=metric`;
    return this.http.get<ApiWeatherResult>(url);
  }
}
