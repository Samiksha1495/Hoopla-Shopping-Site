import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsComponent } from './product-details.component';
import { AppComponent } from '../app.component';
import { ProductsComponent } from 'src/app/products/products.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {GrowlModule} from 'primeng/growl';
import { AppRoutingModule } from '../app-routing.module';
import {CardModule} from 'primeng/card';
import { UriService } from '../uri.service';
import {CaptchaModule} from 'primeng/captcha';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LoginComponent } from '../login/login.component';
import {TabViewModule} from 'primeng/tabview';
import {RatingModule} from 'primeng/rating';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {APP_BASE_HREF} from '@angular/common'
import { GuardService } from '../guard.service';
import { RegisterService } from '../login/register.service';
import {MegaMenuModule} from 'primeng/megamenu';
import { OrdersComponent } from '../orders/orders.component';
import { ProductsService } from 'src/app/products.service';
import { CartService } from 'src/app/cart/cart.service';
import { RegisterComponent } from 'src/app/register/register.component';
import { CartComponent } from 'src/app/cart/cart.component';
import { ProfileComponent } from '../profile/profile.component';

// import { ProductDetailsComponent } from 'src/app/product-details/product-details.component';
import {SpinnerModule} from 'primeng/spinner';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { ToolbarModule } from 'primeng/toolbar';
import {SplitButtonModule} from 'primeng/splitbutton';
import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';
import {ProgressBarModule} from 'primeng/progressbar';
import {CalendarModule} from 'primeng/calendar';
import {PasswordModule} from 'primeng/password';
import { MessagesModule } from 'primeng/messages';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MessageModule } from 'primeng/message';
import { SliderModule } from 'primeng/slider';
describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
     declarations: [AppComponent,
        DashboardComponent,
        LoginComponent,
        ProductsComponent,
        OrdersComponent, 
        RegisterComponent,
        CartComponent,
        ProductDetailsComponent,
        ProfileComponent
      ],
      imports: [
        BrowserModule,AppRoutingModule,HttpClientModule,MessageModule,MessagesModule,ProgressBarModule,
        FormsModule,ReactiveFormsModule,RatingModule,InputTextModule,ButtonModule,CardModule,MegaMenuModule
        ,CaptchaModule,GrowlModule,ProgressSpinnerModule,SplitButtonModule,KeyFilterModule,CalendarModule,
        PasswordModule,SpinnerModule

      ],
      providers: [{provide: APP_BASE_HREF,useValue:'/'},UriService,RegisterService, GuardService,ProductsService,CartService,MessageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show',()=>{
    let text="kurta";
    expect(component.showViaService(text)).toBeTruthy();
  });
});
