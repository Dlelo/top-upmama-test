import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from './../../components/alert/alert.service';
import {TopupmamaService } from '../../service/topupmama.service';
import { User } from '../../dashboard/users/users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  user: User;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private topupmamaService: TopupmamaService,
    private alertService: AlertService
  ) {
    this.user = this.topupmamaService.userValue;
   }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
  });
  }
  get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.topupmamaService.login(this.f['email'].value, this.f['password'].value)
          .subscribe(
                res => {

                    // get return url from query parameters or default to home page
                    // const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                    // this.router.navigateByUrl(returnUrl);
                    this.alertService.success('Login successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../home'], { relativeTo: this.route });

                }, error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            );
    }

}
