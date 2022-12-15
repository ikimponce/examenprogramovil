import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { User } from 'src/app/types/User';
import { RutValidator } from '../../utils/RutValidador';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
formdata!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.formdata = this.formBuilder.group(
      {
        rut: ['',Validators.compose([RutValidator.checkRut, Validators.required])],
      first_name: ['',Validators.required],
      last_name: ['',Validators.required],
      mothers_last_name: ['', Validators.required],
      email:['',Validators.compose([Validators.required,Validators.email])],
      direccion:['',Validators.required],
      telefono:['',Validators.required],
      role: "USER",
      password:['',Validators.required],
      confirm_password:['',Validators.required],
      active: true,
      },
      { validators: this.checkPasswords }
    );
  }

  async createUser(){
    const loading = await this.loadingCtrl.create();
    await loading.present();
    const newUser = this.formdata.value as User;
    this.usersService.post(newUser).subscribe(
      (res) => {
        loading.dismiss();
        this.router.navigate(['/login'], {replaceUrl: true});
      },
      (error) => {
        loading.dismiss();
        let msg = error.message;

        if (error.error.errors){
          msg = '';
          error.error.errors.forEach((e: any) =>{
            msg += `${e.message}<br/>`;
          });
        }
        this.alertPresent('Error', msg);
      }
    )
  }

  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirm_password')?.value;
    return pass === confirmPass ? null : { notSame: true };
  };

  async alertPresent(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  };

  backToLogin(){
    //this.router.navigate(['/registro'], { replaceUrl: true });
    this.navCtrl.navigateForward(['/login']);
  }
}
