import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as _ from "lodash";

import { assets } from '../app.config';
import { loginFactory } from './login.resource';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  // styleUrls: ['../app.component.css', './login.component.css'],
  providers: [assets, loginFactory]
})
export class LoginComponent implements OnInit {
  
  Form: FormGroup;

  loginCredentials = {
    mobileNumber: '',
    pin: ''
  };

  userData: any;

  submitted: false;

  formErrors = {
    'mobileNumber': '',
    'pin': ''
  };

  validationMessages = {
    'mobileNumber': {
      'required': 'Number is required.',
      'minlength': 'Number must be at least 10 digits long.',
      'maxlength': 'Number cannot be more than 10 digits long.',
      'pattern': 'Please enter only numbers.'
    },
    'pin': {
      'required': 'Pin is required.',
      'minlength': 'Password must be at 4 digits long.',
      'maxlength': 'Password cannot be more than 4 digits long.',
      'pattern': 'Please enter only numbers.'
    }
  };

  returnUrl: string;


  constructor(private assets: assets, private formBuilder: FormBuilder, private loginFactory: loginFactory, private router: Router, private route: ActivatedRoute, ) { }

  ngOnInit() {
    // reset login status
    // this.authenticationService.logout();

    // get return url from route parameters or default to '/'

    if (localStorage.getItem('auth')) {
      // logged in so return true
      this.router.navigate(['/dashboard']);
      return;
    }

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.buildForm();


  }

  buildForm(): void {
    this.Form = this.formBuilder.group({
      'mobileNumber': [
        this.loginCredentials.mobileNumber, [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern("^[0-9]+$")
        ]
      ],
      'pin': [this.loginCredentials.pin, [
        Validators.required,
        Validators.maxLength(4),
        Validators.minLength(4),
        Validators.pattern("^[0-9]+$")]
      ]
    });
    this.Form.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.Form) { return; }
    const form = this.Form;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] = "";
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  submit() {
    this.loginFactory.login(this.loginCredentials).subscribe(response => {
      this.userData = response;
      this.userData = JSON.parse(this.userData._body);
      localStorage.setItem('user', this.userData.user);
      localStorage.setItem('auth', this.userData.auth);
      this.router.navigate(['dashboard']);

    }, error => {
      console.log(error);
    });
  }



}
