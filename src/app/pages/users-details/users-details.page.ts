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
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/types/User';
import { RutValidator } from '../../utils/RutValidador';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.page.html',
  styleUrls: ['./users-details.page.scss'],
})
export class UsersDetailsPage implements OnInit {
  id: string = '';
  formdata!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.createForm();
    this.id = this.activatedRouter.snapshot.paramMap.get('id') || '';
    if (this.id) {
      this.usersService.show(this.id).subscribe(
        (resp) => {
          console.log(resp);
          const data = resp.data;
          console.log(data);
          this.formdata.controls['rut'].setValue(data.rut ? data.rut : '');
          this.formdata.controls['first_name'].setValue(
            data.first_name ? data.first_name : ''
          );
          this.formdata.controls['last_name'].setValue(
            data.last_name ? data.last_name : ''
          );
          this.formdata.controls['mothers_last_name'].setValue(
            data.mothers_last_name ? data.mothers_last_name : ''
          );
          this.formdata.controls['email'].setValue(
            data.email ? data.email : ''
          );
          this.formdata.controls['direccion'].setValue(
            data.direccion ? data.direccion : ''
          );
          this.formdata.controls['telefono'].setValue(
            data.telefono ? data.telefono : ''
          );
          this.formdata.controls['role'].setValue(data.role ? data.role : '');
          this.formdata.controls['active'].setValue(
            data.active ? String(data.active) : ''
          );
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.router.navigate(['/not-found'], { replaceUrl: true });
    }
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
        password: [''],
        confirm_password: [''],
        active: ['', Validators.required],
      },
      { validators: this.checkPasswords }
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

  async updateUser() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    const updateUser = this.formdata.value as User;
    this.usersService.put(this.id, updateUser).subscribe(
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

  async deleteUser() {
    console.log(this.id);
    const alert = await this.alertCtrl.create({
      header: 'Confirm!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: async () => {
            console.log('cancel');
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: async () => {
            const loading = await this.loadingCtrl.create();
            await loading.present();
            this.usersService.delete(this.id).subscribe(
              (resp) => {
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

            console.log('ok');
          },
        },
      ],
    });
    await alert.present();
  }
}
