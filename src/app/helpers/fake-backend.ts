import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';
import { Role } from '../models/role-model';

import items from './fake-backend-data';

// array in local storage for registered users
const usersKey = 'angular-11-crud-example-users';
const usersJSON = localStorage.getItem(usersKey);
let users: any[] = usersJSON ? JSON.parse(usersJSON) : [
  { id: 1, title: 'Mr', firstName: 'Joe', lastName: 'Bloggs', email: 'joe@mail.com', role: Role.User, username: 'joe', password: 'joe123' },
  { id: 2, title: "Admin", firstName: 'Admin', lastName: 'Admin', email: 'jadminoe@mail.com', role: Role.Admin, username: 'admin', password: 'admin' },
  { id: 3, title: "User", firstName: 'User', lastName: 'User', email: 'user@mail.com', role: Role.User, username: 'user', password: 'user' }
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    return handleRoute();

    function handleRoute() {
      switch (true) {
        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/users/register') && method === 'POST':
          return register();
        case url.endsWith('/users') && method === 'GET':
          return getUsers();
        case url.match(/\/users\/\d+$/) && method === 'GET':
          return getUserById();
        case url.endsWith('/users') && method === 'POST':
          return createUser();
        case url.match(/\/users\/\d+$/) && method === 'PUT':
          return updateUser();
        case url.match(/\/users\/\d+$/) && method === 'DELETE':
          return deleteUser();
        // paing
        case url.endsWith('/items') && method === 'GET':
          return ok(items);
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function authenticate() {
      console.log(body);
      const { username, password } = body;
      const user = users.find(x => x.username === username && x.password === password);
      if (!user) return error('Username or password is incorrect');
      // return ok({
      //   ...basicDetails(user),
      //   token: 'fake-jwt-token'
      // })
      return ok({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        token: `fake-jwt-token.${user.id}`
      });
    }

    function register() {
      const user = body

      if (users.find(x => x.username === user.username)) {
        return error('Username "' + user.username + '" is already taken')
      }

      user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
      users.push(user);
      localStorage.setItem(usersKey, JSON.stringify(users));
      return ok();
    }



    function getUsers() {
      return ok(users.map(x => basicDetails(x)));
    }

    function getUserById() {
      const user = users.find(x => x.id === idFromUrl());
      return ok(basicDetails(user));
    }

    function createUser() {
      const user = body;

      if (users.find(x => x.email === user.email)) {
        return error(`User with the email ${user.email} already exists`);
      }

      // assign user id and a few other properties then save
      user.id = newUserId();
      delete user.confirmPassword;
      users.push(user);
      localStorage.setItem(usersKey, JSON.stringify(users));

      return ok();
    }

    function updateUser() {
      let params = body;
      let user = users.find(x => x.id === idFromUrl());

      if (params.email !== user.email && users.find(x => x.email === params.email)) {
        return error(`User with the email ${params.email} already exists`);
      }

      // only update password if entered
      if (!params.password) {
        delete params.password;
      }

      // update and save user
      Object.assign(user, params);
      localStorage.setItem(usersKey, JSON.stringify(users));

      return ok();
    }

    function deleteUser() {
      users = users.filter(x => x.id !== idFromUrl());
      localStorage.setItem(usersKey, JSON.stringify(users));
      return ok();
    }

    // helper functions

    function ok(body?: any) {
      return of(new HttpResponse({ status: 200, body }))
        .pipe(delay(500)); // delay observable to simulate server api call
    }

    function error(message: any) {
      return throwError({ error: { message } })
        .pipe(materialize(), delay(500), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
    }

    function unauthorized() {
      return throwError(() => ({ status: 401, error: { message: 'unauthorized' } }))
        .pipe(materialize(), delay(500), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
    }

    function basicDetails(user: any) {
      const { id, title, firstName, lastName, email, role } = user;
      return { id, title, firstName, lastName, email, role };
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1]);
    }

    function isLoggedIn() {
      const authHeader = headers.get('Authorization') || '';
      return authHeader.startsWith('Bearer fake-jwt-token');
    }

    function isAdmin() {
      return currentUser()?.role === Role.Admin;
    }

    function currentUser() {
      if (!isLoggedIn()) return;
      const id = parseInt(headers.get('Authorization')!.split('.')[1]);
      return users.find(x => x.id === id);
    }


    function newUserId() {
      return users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
