import { HttpClient } from '@angular/common/http';
import { Component, SimpleChanges, VERSION } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { concatMap, first } from 'rxjs';
import { LoadingService } from 'src/app/helpers/loading.service';
import { User } from 'src/app/models/user-model';
import { AuthService } from '../auth/services/auth.service';
import { UserService } from '../users/services/user.service';
import { NotificationService } from '../../components/notification/notification.service';

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

  // paging
  items: any[] = [];
  pageOfItems?: Array<any>;
  sortProperty: string = 'id';
  sortOrder = 1;

  constructor(public loader: LoadingService, private http: HttpClient,
    private userService: UserService,
    private authenticationService: AuthService,
    private toast: HotToastService,
    notify: NotificationService) {
    this.user = <User>this.authenticationService.userValue;
  }


  showToast() {
    this.toast.info("I must be super-useful!", {
      duration: 500, position: "bottom-center", autoClose: true,
      style: {
        border: '1px solid #713200',
        padding: '16px',
        color: '#713200',
      },
      iconTheme: {
        primary: '#713200',
        secondary: '#FFFAEE',
      },
    })
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

    this.http.get<any[]>('/items')
      .subscribe(x => {
        this.items = x;
        console.log("Items: ", this.items);
        this.loading = false;
      });
  }


  /**
    Paging
   */

  onChangePage(pageOfItems: Array<any>) { //
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  sortBy(property: string) {
    this.sortOrder = property === this.sortProperty ? (this.sortOrder * -1) : 1;
    this.sortProperty = property;
    this.items = [...this.items.sort((a: any, b: any) => {
      // sort comparison function
      let result = 0;
      if (a[property] < b[property]) {
        result = -1;
      }
      if (a[property] > b[property]) {
        result = 1;
      }
      return result * this.sortOrder;
    })];
  }

  sortIcon(property: string) {
    if (property === this.sortProperty) {
      return this.sortOrder === 1 ? '☝️' : '👇';
    }
    return '';
  }
}
