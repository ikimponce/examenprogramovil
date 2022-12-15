import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { ClimaService } from 'src/app/services/clima.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-clima',
  templateUrl: './clima.page.html',
  styleUrls: ['./clima.page.scss'],
})
export class ClimaPage implements OnInit {
  icon: string = '';
  temperatura: number = 0;
  lugar: string = '';
  descripcion: string = '';

  constructor(
    private geolocation: Geolocation,
    private climaService: ClimaService,
    private loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        return this.climaService
          .getWeather(resp.coords.latitude, resp.coords.longitude)
          .subscribe(
            (resp) => {
              this.icon = `http://openweathermap.org/img/wn/${resp.weather[0].icon}@2x.png`;
              this.temperatura = resp.main.temp;
              this.lugar = resp.name;
              this.descripcion = resp.weather[0].description;
              loading.dismiss();
            },
            (err) => {
              console.log(err);
              loading.dismiss();
            }
          );
      })
      .catch((error) => {
        loading.dismiss();
        console.log('Error getting location', error);
      });
  }
}
