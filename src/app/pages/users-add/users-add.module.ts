import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersAddPageRoutingModule } from './users-add-routing.module';

import { UsersAddPage } from './users-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersAddPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [UsersAddPage],
})
export class UsersAddPageModule {}
