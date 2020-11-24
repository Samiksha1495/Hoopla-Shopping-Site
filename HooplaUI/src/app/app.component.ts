import { Component, OnInit } from '@angular/core';

import {CardModule} from 'primeng/card';
import { Routes, Router } from '@angular/router';
import { User } from './login/user';
import { RegisterService } from './login/register.service';

import {MegaMenuModule} from 'primeng/megamenu';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title:string = 'hoopla';
  loggedUser:User;
  MenuItem:string[]=['Electronics','Furniture','Shoes','Clothing'];
  items:any[]
  constructor( private router:Router, 
      private registerService:RegisterService) {
  }

  ngOnInit() {
    
  }

  logout() {
    sessionStorage.clear();
    this.loggedUser=null;
    this.router.navigate(['/']);
  }

  ngDoCheck(): void { 
    this.loggedUser = new User();
    this.loggedUser.uCredentials.uEmail = sessionStorage.getItem('uEmail');
    this.loggedUser.uCart = JSON.parse(sessionStorage.getItem('uCart'));
  }

  authenticateBySession() {
    let loggedEmail=sessionStorage.getItem("uEmail");
    console.log(sessionStorage); 
    console.log(sessionStorage.getItem("uCart"));
    
    if(loggedEmail) {
      this.registerService.getUserDetail(loggedEmail).subscribe(
        res => {
          this.loggedUser=res;
        },
        err => {this.loggedUser=null;}
      );

    }
    else {
      this.loggedUser=null;
    }

  }


}