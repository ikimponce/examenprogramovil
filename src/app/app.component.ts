import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { menuController } from '@ionic/core';
import jwt_decode from 'jwt-decode';
import { decode } from 'querystring';
import { AuthToken } from 'src/app/types/AuthToken';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  appPages: any;
  constructor(private router: Router) {
    //window.localStorage.setItem("_token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODk1MTczZTVlZTk3ZjRhMjUyYTMwOCIsImVtYWlsIjoiaWtpbXBvbmNlQGdtYWlsLmNvbSIsIm5hbWUiOiJJS0kgTU9MSU5BIFBPTkNFIiwicm9sZSI6IkFETSIsImlhdCI6MTY3MDk5MTgxNi44NDQsImV4cCI6MTcwMjUyNzgxNi44NDR9.KLkYA1GlgUhRVpGLc8ZgqyyiDT5moA9VY2ZySNQrlM4");
  }

  ngOnInit() {
    try {
      const token = window.localStorage.getItem('_token') || '';
      const decoded = jwt_decode(token) as AuthToken;
      console.log(decoded);
      //if (decoded.role === 'ADM') {
      this.appPages = [
        { title: 'Home', url: '/home', icon: 'home' },
        { title: 'Users', url: '/users', icon: 'people' },
        { title: 'Asistencia', url: '/asistencia', icon: 'people' },
        { title: 'Conversor', url: '/conversor', icon: 'cash' },
        { title: 'Clima', url: '/clima', icon: 'cloudy-night' },
      ];
      /*} else {
        console.log('kk');
        this.appPages = [
          { title: 'Home', url: '/home', icon: 'home' },
          { title: 'Conversor', url: '/conversor', icon: 'cash' },
          { title: 'Clima', url: '/clima', icon: 'cloudy-night' },
        ];
      }*/
    } catch (error) {
      console.log(error);
    }
  }
  async logout() {
    window.localStorage.removeItem('_token');
    await menuController.close();
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
