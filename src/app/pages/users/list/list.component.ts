import { Component } from '@angular/core';
import { first } from 'rxjs';
import { User } from 'src/app/models/user-model';
import { UserService } from 'src/app/pages/users/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  users!: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAll()
      .pipe(first())
      .subscribe(users => this.users = users);
  }

  deleteUser(id: string) {
    const user = this.users.find(x => x.id === id);
    if (!user) return;
    user.isDeleting = true;
    this.userService.delete(id)
      .pipe(first())
      .subscribe(() => this.users = this.users.filter(x => x.id !== id));
  }
}
