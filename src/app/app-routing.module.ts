import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AuthAdminGuard } from './guards/auth-admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'conversor',
    loadChildren: () =>
      import('./pages/conversor/conversor.module').then(
        (m) => m.ConversorPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'clima',
    loadChildren: () =>
      import('./pages/clima/clima.module').then((m) => m.ClimaPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./pages/users/users.module').then((m) => m.UsersPageModule),
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'users/add',
    loadChildren: () =>
      import('./pages/users-add/users-add.module').then(
        (m) => m.UsersAddPageModule
      ),
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'users/details/:id',
    loadChildren: () =>
      import('./pages/users-details/users-details.module').then(
        (m) => m.UsersDetailsPageModule
      ),
    canActivate: [AuthAdminGuard],
  },

  {
    path: 'not-found',
    loadChildren: () =>
      import('./pages/not-found/not-found.module').then(
        (m) => m.NotFoundPageModule
      ),
  },
  {
    path: 'users-add',
    loadChildren: () =>
      import('./pages/users-add/users-add.module').then(
        (m) => m.UsersAddPageModule
      ),
      canActivate: [AuthAdminGuard],
  },
  {
    path: 'users-details',
    loadChildren: () =>
      import('./pages/users-details/users-details.module').then(
        (m) => m.UsersDetailsPageModule
      ),
      canActivate: [AuthAdminGuard],
  },
  {
    path: 'asistencia',
    loadChildren: () =>
      import('./pages/asistencia/asistencia.module').then(
        (m) => m.AsistenciaPageModule
      ),
      canActivate: [AuthGuard],
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
