import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart/cart.service';

import {AppComponent} from 'src/app/app.component';
import { Cart, User } from 'src/app/login/user';
import { Product } from 'src/app/cart/product';
import { OrdersService } from 'src/app/orders.service';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/login/register.service';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {GrowlModule} from 'primeng/growl';

import {SelectItem} from 'primeng/components/common/api';
import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';

import { RegisterComponent } from '../register/register.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// import {GrowlModule} from 'primeng/growl';
import { AppRoutingModule } from '../app-routing.module';
import {CardModule} from 'primeng/card';
import { UriService } from '../uri.service';
import {CaptchaModule} from 'primeng/captcha';
// import { AppComponent } from '../app.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LoginComponent } from '../login/login.component';
import {TabViewModule} from 'primeng/tabview';
import {RatingModule} from 'primeng/rating';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';

import { GuardService } from '../guard.service';
// import { RegisterService } from '../login/register.service';
import {MegaMenuModule} from 'primeng/megamenu';
// import { ProductsComponent } from '../products/products.component';
import { OrdersComponent } from '../orders/orders.component';
import { ProductsService } from 'src/app/products.service';
// import { CartService } from 'src/app/cart/cart.service';
// import { RegisterComponent } from 'src/app/register/register.component';
// import { CartComponent } from 'src/app/cart/cart.component';
import { ProfileComponent } from '../profile/profile.component';
import {KeyFilterModule} from 'primeng/keyfilter';
import { ProductDetailsComponent } from 'src/app/product-details/product-details.component';
import {SpinnerModule} from 'primeng/spinner';
// import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { ToolbarModule } from 'primeng/toolbar';
import {SplitButtonModule} from 'primeng/splitbutton';
// import {Component} from '@angular/core';
// import {SelectItem} from 'primeng/components/common/api';
// import {Message} from 'primeng/components/common/api';
// import {MessageService} from 'primeng/components/common/messageservice';


import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ProgressBarModule} from 'primeng/progressbar';
import {CalendarModule} from 'primeng/calendar';
import {PasswordModule} from 'primeng/password';

import {APP_BASE_HREF} from '@angular/common'
import { ProductsComponent } from 'src/app/products/products.component';

// import { DashboardComponent } from './dashboard.component';


describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartComponent,
        ProductsComponent,
        ProfileComponent,RegisterComponent,
        AppComponent,
        DashboardComponent,
        LoginComponent,
        OrdersComponent, 
        RegisterComponent,
        ProductDetailsComponent, ],
        imports:[
          BrowserModule,AppRoutingModule,HttpClientModule,MessageModule,MessagesModule,ProgressBarModule,
    FormsModule,ReactiveFormsModule,RatingModule,InputTextModule,ButtonModule,CardModule,MegaMenuModule
    ,CaptchaModule,GrowlModule,ProgressSpinnerModule,SplitButtonModule,KeyFilterModule,CalendarModule,
    PasswordModule,SpinnerModule
        ],
        providers:[
          {provide: APP_BASE_HREF,useValue:'/'},
            UriService,RegisterService, GuardService,ProductsService,CartService,MessageService
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should return calculated price", () => {
    expect(component.calculatePrice()).toBeTruthy();
  })

  it("Should return true", () => {
    expect(component.initialize()).toBeTruthy();
  })
  

});
