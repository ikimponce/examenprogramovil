import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { LoginRequest } from 'src/app/types/LoginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private router: Router,
    private alertCtrl: AlertController,
    private loginService: LoginService,
    private authGuard: AuthGuard,
    private navCtrl: NavController
  ) {
    if (authGuard.isLoggedIn()) {
      this.router.navigateByUrl('/home', { replaceUrl: true });
    }
  }

  ngOnInit() {
    this.createForm();
  }

  get email() {
    return this.credentials?.get('email');
  }

  get password() {
    return this.credentials?.get('password');
  }

  createForm() {
    this.credentials = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  async login() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    const userLogin: LoginRequest = {
      email: this.credentials.value.email,
      password: this.credentials.value.password,
    };
    this.loginService.login(userLogin).subscribe(
      (res) => {
        window.localStorage.setItem('_token', res.data.token);
        this.router.navigate(['/home'], { replaceUrl: true });
        loading.dismiss();
      },
      (err) => {
        loading.dismiss();
        this.alertPresent('Login failed',err.message);

        //this.alertPresent('Login failed', 'Please try again!');
      }
    );
  }

  redirectRegister(){
    //this.router.navigate(['/registro'], { replaceUrl: true });
    this.navCtrl.navigateForward(['/registro']);
  }

  async alertPresent(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
