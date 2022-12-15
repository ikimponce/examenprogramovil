import { Component, OnInit } from '@angular/core';
import { ConversorService } from 'src/app/services/conversor.service';
import { LoadingController } from '@ionic/angular';
import { ApiConversorResult } from 'src/app/types/ApiConversorResult';
@Component({
  selector: 'app-conversor',
  templateUrl: './conversor.page.html',
  styleUrls: ['./conversor.page.scss'],
})
export class ConversorPage implements OnInit {
  conversor!: ApiConversorResult;
  pesos!: number;
  dolares!: number;
  euros!: number;
  show!: boolean;

  constructor(private conversorService: ConversorService, private loadingCtrl: LoadingController) {}

  ngOnInit() {
    //this.loadData();
  }

  async loadData() {
    this.conversorService.getConversorData().subscribe(
      (res) => {
        this.conversor = res;
        this.dolares = this.pesos / res.dolar.valor;
        this.euros = this.pesos / res.euro.valor;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  async onConversor() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    this.show = false;
    this.conversorService.getConversorData().subscribe(
      (res) => {
        this.conversor = res;
        this.dolares = this.pesos / res.dolar.valor;
        this.euros = this.pesos / res.euro.valor;
      },
      (err) => {
        console.log(err);
      }
    );
    this.show = true;
    loading.dismiss();
  }

  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
