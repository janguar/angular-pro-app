import { Component } from '@angular/core';
import { Role } from './models/role-model';
import { User } from './models/user-model';
import { AuthService } from './pages/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Hello Angular app!!';

  user?: User | null;

  constructor(private accountService: AuthService) {
    this.accountService.user.subscribe(x => this.user = x);
  }
  get isAuth() {
    return this.accountService.userValue != null;
  }


  get isAdmin() {
    return this.user?.role === Role.Admin;
  }
  logout() {
    this.accountService.logout();
  }
}
