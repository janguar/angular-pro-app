import { HttpClient } from '@angular/common/http';
import { Component, VERSION } from '@angular/core';
import { concatMap } from 'rxjs';
import { LoadingService } from 'src/app/helpers/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  version = VERSION.full;
  loading$ = this.loader.loading$;

  constructor(public loader: LoadingService, private http: HttpClient) { }

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
}
