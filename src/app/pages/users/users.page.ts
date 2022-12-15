import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/types/User';
import { UserResponse } from 'src/app/types/UserResponse';
import { UsersResponse } from 'src/app/types/UsersResponse';
import { InfiniteScrollCustomEvent, NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-users-add',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  data!: UsersResponse;
  usersData!: User[];

  constructor(
    private usersService: UsersService,
    private navController: NavController
  ) {}

  ionViewWillEnter() {
    this.usersService.get(1).subscribe(
      (resp) => {
        this.data = resp;
        this.usersData = resp.data.docs;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.usersData = [];
  }

  goUpdate(id: string) {
    this.navController.navigateForward([`/users/details/${id}`]);
  }

  onIonInfinite(ev: any) {
    if (this.data.data.hasNextPage) {
      this.usersService.get(this.data.data.nextPage).subscribe(
        (resp) => {
          this.data = resp;
          resp.data.docs.forEach((e) => {
            this.usersData.push(e);
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
