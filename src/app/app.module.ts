import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertComponent } from './components/alert/alert.component';
import { fakeBackendProvider } from './helpers/fake-backend';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { HomeComponent } from './pages/home/home.component';
import { Page404Component } from './pages/page404/page404.component';
import { ModalComponent } from './components/modal/modal.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NetworkInterceptor } from './interceptors/network.interceptor';
import { MustMatchDirective } from './helpers/must-match.directive';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { AdminComponent } from './pages/admin/admin.component';
import { PaginationComponent } from './components/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    Page404Component,
    ModalComponent,
    NotificationComponent,
    MustMatchDirective,
    AdminComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    /**
      angular R3InjectorError(UserModule)[UserService -> UserService -> HttpClient -> HttpClient -> HttpClient]:
     */
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: NetworkInterceptor, multi: true },
    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
