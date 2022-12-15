import { Component, OnDestroy } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { LoadingController, AlertController } from '@ionic/angular';
import { AttendanceService } from 'src/app/services/attendance.service';
import { Attendance } from 'src/app/types/Attendance';
import { AttendanceResponse } from 'src/app/types/AttendanceResponse';
import { AttendancesResponse } from 'src/app/types/AttendancesResponse';
import jwt_decode from 'jwt-decode';
import { AuthToken } from 'src/app/types/AuthToken';
import { Router } from '@angular/router';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnDestroy {
  content_visibility = '';
  scannedResult: any;
  data!: AttendancesResponse;
  attendancesData!: Attendance[];
  userId = '';

  constructor(
    private router: Router,
    private attendanceService: AttendanceService,private loadingCtrl: LoadingController,private alertCtrl: AlertController
  ) {
    const token = window.localStorage.getItem('_token') || '';
    const decoded = jwt_decode(token) as AuthToken;
    this.userId = decoded.id;
    console.log(decoded);
  }

  ionViewWillEnter() {
    this.attendanceService.getUser(this.userId, 1).subscribe(
      (resp) => {
        this.data = resp;
        this.attendancesData = resp.data.docs;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit() {}

  async checkPermission() {
    try {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async startScan() {
    try {
      const permission = await this.checkPermission();
      if (!permission) {
        return;
      }
      await BarcodeScanner.hideBackground();
      document.querySelector('body')!.classList.add('scanner-active');
      this.content_visibility = 'hidden';
      const result = await BarcodeScanner.startScan();
      BarcodeScanner.showBackground();
      document.querySelector('body')?.classList.remove('scanner-active');
      this.content_visibility = '';
      if (result?.hasContent) {
        this.scannedResult = result.content;
        console.log(this.scannedResult);

        const qr = JSON.parse(this.scannedResult);
        const loading = await this.loadingCtrl.create();
        await loading.present();
        const newAttendance: Attendance = {
          fecha: qr.fecha,
          nombre: qr.nombre,
          userId: this.userId,
        };
        this.attendanceService.post(newAttendance).subscribe(
          (res) => {
            this.attendanceService.getUser(this.userId, 1).subscribe(
              (resp) => {
                this.data = resp;
                this.attendancesData = resp.data.docs;
              },
              (error) => {
                console.log(error);
              }
            );
            loading.dismiss();
            //this.router.navigate(['/'], { replaceUrl: true });
          },
          (error) => {
            loading.dismiss();
            let msg = error.message;
            if (error.error.errors) {
              msg = '';
              error.error.errors.forEach((e: any) => {
                msg += `${e.message}<br/>`;
              });
            }
            this.alertPresent('Error', msg);
          }
        );
      }
    } catch (e) {
      console.log(e);
      this.stopScan();
    }
  }

  async alertPresent(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body')!.classList.remove('scanner-active');
    this.content_visibility = '';
  }

  ngOnDestroy(): void {
    this.stopScan();
  }

  onIonInfinite(ev: any) {
    if (this.data.data.hasNextPage) {
      this.attendanceService
        .getUser(this.userId, this.data.data.nextPage)
        .subscribe(
          (resp) => {
            this.data = resp;
            resp.data.docs.forEach((e) => {
              this.attendancesData.push(e);
            });
          },
          (error) => {
            console.log(error);
          }
        );
    }
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}
