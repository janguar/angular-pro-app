import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AlertService } from 'src/app/components/alert/service/alert.service';
import { MustMatch } from 'src/app/helpers/must-match.validator';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  form!: FormGroup;
  id: string = "";
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      // password and confirm password only required in add mode
      password: ['', [Validators.minLength(6), ...(!this.id ? [Validators.required] : [])]],
      confirmPassword: ['', [...(!this.id ? [Validators.required] : [])]]
    }, {
      validators: MustMatch('password', 'confirmPassword')
    });

    this.title = 'Add User';
    if (this.id) {
      // edit mode
      this.title = 'Edit User';
      this.loading = true;
      this.userService.getById(this.id)
        .pipe(first())
        .subscribe(x => {
          this.form.patchValue(x);
          this.loading = false;
        });
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.submitting = true;
    this.saveUser()
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('User saved', { keepAfterRouteChange: true });
          this.router.navigateByUrl('/users');
        },
        error: error => {
          this.alertService.error(error);
          this.submitting = false;
        }
      })
  }

  private saveUser() {
    // create or update user based on id param
    return this.id
      ? this.userService.update(this.id!, this.form.value)
      : this.userService.create(this.form.value);
  }
}
