import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { User } from 'src/app/types/User';
import { RutValidator } from '../../utils/RutValidador';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users-add.page.html',
  styleUrls: ['./users-add.page.scss'],
})
export class UsersAddPage implements OnInit {
  formdata!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formdata = this.formBuilder.group(
      {
        rut: [
          '',
          Validators.compose([RutValidator.checkRut, Validators.required]),
        ],
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        mothers_last_name: ['', Validators.required],
        email: [
          '',
          Validators.compose([Validators.required, Validators.email]),
        ],
        direccion: ['', Validators.required],
        telefono: ['', Validators.required],
        role: ['', Validators.required],
        password: ['', Validators.required],
        confirm_password: ['', Validators.required],
        active: ['', Validators.required],
      },
      { validators: this.checkPasswords }
    );
  }

  async createUser() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    const newUser = this.formdata.value as User;
    this.usersService.post(newUser).subscribe(
      (res) => {
        loading.dismiss();
        this.router.navigate(['/users'], { replaceUrl: true });
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
  }
}
