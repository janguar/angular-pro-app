import { HttpClient } from '@angular/common/http';
import { Component, VERSION } from '@angular/core';
import { NgForm } from '@angular/forms';
import { concatMap, first } from 'rxjs';
import { LoadingService } from 'src/app/helpers/loading.service';
import { User } from 'src/app/models/user-model';
import { AuthService } from '../auth/services/auth.service';
import { UserService } from '../users/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  version = VERSION.full;
  loading$ = this.loader.loading$;
  loading = false;
  user: User;
  userFromApi?: User;
  constructor(public loader: LoadingService, private http: HttpClient,
    private userService: UserService,
    private authenticationService: AuthService) {
    this.user = <User>this.authenticationService.userValue;
  }

  fetchData() {
    this.http
      .get('https://api.github.com/users/thisiszoaib')
      .subscribe((res) => {
        console.log(res);
      });
  }

  fetchMultipleData() {
    this.http
      .get('https://api.github.com/users/thisiszoaib')
      .subscribe((res) => {
        console.log(res);
      });

    this.http.get('https://api.github.com/users/thisiszoaib').pipe(
      concatMap(() => this.http.get('https://api.github.com/users'))
    )
      .subscribe((res) => {
        console.log(res);
      });

  }

  onSubmit(f: NgForm) {
    // stop here if form is invalid
    if (f.invalid) {
      return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(f.value, null, 4));
  }


  ngOnInit() {
    this.loading = true;
    this.userService.getById(this.user.id).pipe(first()).subscribe(user => {
      this.loading = false;
      this.userFromApi = user;
    });
  }
}
