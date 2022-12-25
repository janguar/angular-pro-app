import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { Page404Component } from './pages/page404/page404.component';

const usersModule = () => import('./pages/users/users.module').then(x => x.UsersModule);

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', loadChildren: usersModule },

  // otherwise redirect to home
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
