import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { AuthToken } from 'src/app/types/AuthToken';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  user!: AuthToken;
  constructor() {}

  ngOnInit() {
    const token = window.localStorage.getItem('_token') || '';
    this.user = jwt_decode(token);
  }
}
