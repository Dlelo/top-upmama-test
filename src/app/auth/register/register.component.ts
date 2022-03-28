import { Component, OnInit } from '@angular/core';
import { ValidationErrors, ValidatorFn, AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from './../../components/alert/alert.service';
import {TopupmamaService } from '../../service/topupmama.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export default class RegisterComponent implements OnInit {
  submitted = false;
  loading = false;

  registerForm: FormGroup = new FormGroup({
  email: new FormControl(''),
  password: new FormControl(''),
});

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
        private router: Router,
        private accountService: TopupmamaService,
        private alertService: AlertService

    ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        email:['', [Validators.required, Validators.email]],
        password:['', [
            Validators.compose([
              Validators.minLength(8),
              Validators.maxLength(40),
              Validators.required,
              // check whether the entered password has a number
              // this.patternValidator(/\d/, {
              //   hasNumber: true
              // }),
              // // check whether the entered password has upper case letter
              // this.patternValidator(/[A-Z]/, {
              //   hasCapitalCase: true
              // }),
              // // check whether the entered password has a lower case letter
              // this.patternValidator(/[a-z]/, {
              //   hasSmallCase: true
              // }),
              // // check whether the entered password has a special character
              // this.patternValidator(
              //   /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
              //   {
              //     hasSpecialCharacters: true
              //   }
              // ),
              Validators.minLength(8)
            ])

        ]],
        confirmPassword:['', Validators.required]
      },

    )
  }
  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    console.log(JSON.stringify(this.registerForm.value, null, 2));
    this.loading = true;
        this.accountService. registerUser(this.registerForm.value.email, this.registerForm.value.password )
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Registration successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../login'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
         });
  }
  onReset(): void {
    this.submitted = false;
    this.registerForm.reset();
  }
  // patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any | null } => {
  //     if (!control.value) {
  //       // if control is empty return no error
  //       return isNull ;
  //     }

  //     // test the value of the control against the regexp supplied
  //     const valid = regex.test(control.value);

  //     // if true, return no error (no error), else return error passed in the second parameter
  //     return valid ? isNull : error;
  //   };
  // }


}
