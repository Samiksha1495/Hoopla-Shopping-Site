import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Routes, Router } from '@angular/router';


import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from '../app.module';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { RegisterService } from './register.service';
import { Credentials } from './user';

@Component({
  selector: 'app-login-user',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage: string; 
  successMessage: string;
  loginForm: FormGroup;


  constructor(private fb: FormBuilder, private registerService: RegisterService, private router: Router) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      emailId: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
      }) 
  }

  ngOnInit() { 
  }

  login() {
    let user:Credentials=new Credentials();
    user.uPass=this.loginForm.value.password;
    user.uEmail=this.loginForm.value.emailId;
    this.registerService.login(user).subscribe(
      (response) => {
        this.successMessage = response.message;
        sessionStorage.setItem("uEmail", response.uCredentials.uEmail);
        sessionStorage.setItem("uRole", response.uProfile.uIsSeller.toString());
        sessionStorage.setItem("uCart", JSON.stringify(response.uCart));
        this.router.navigate(['/']); 
      },
      (errorResponse) => {
        this.errorMessage = errorResponse.error.message;
        sessionStorage.clear();
      }
    );
  }
  

}





