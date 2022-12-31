import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './pages/auth/guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { Page404Component } from './pages/page404/page404.component';

const accountModule = () => import('./pages/auth/auth.module').then(x => x.AuthModule);
const usersModule = () => import('./pages/users/users.module').then(x => x.UsersModule);

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
  { path: 'account', loadChildren: accountModule },
  // otherwise redirect to home
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
