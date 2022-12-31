import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LayoutComponent } from './layout.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountRoutingModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    LayoutComponent
  ]
})
export class AuthModule { }
