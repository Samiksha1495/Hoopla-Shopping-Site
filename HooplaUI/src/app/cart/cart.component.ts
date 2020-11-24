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


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  msgs: Message[] = [];
  total: number;
  tax: number;
  finalAmount: number;
  cart: Cart[] = [];
  loggedUser: User;
  // count: number = 0;
  details: any;
  pArr: any[] = [];
  success: string;
  error: string;
  // quantity:number=1;
  constructor(
    public cartService: CartService, 
    public orderService: OrdersService, 
    private router: Router, 
    private messageService: MessageService) { }

  ngOnInit() {
    this.initialize();
  }

  initialize(){
    this.cart = [];
    this.pArr = [];
    this.loggedUser = new User();
    this.loggedUser.uCredentials.uEmail = sessionStorage.getItem('uEmail');
    sessionStorage.setItem('uCart', JSON.stringify(this.pArr));
    this.cartService.getData(this.loggedUser.uCredentials.uEmail)
    .subscribe(
      data => {
        this.details = data;
        for (const i of this.details.uCart) {
          this.cartService.getProducts(i.p_Id).subscribe(
            data => {
              this.pArr.push(data);
              this.cart.push(i);
              this.calculatePrice()
              console.log("cart"+this.cart,"pArr"+this.pArr); 
              sessionStorage.setItem("uCart", JSON.stringify(this.pArr));    
          })
        }
      });
    console.log(this.details);
    return true;
  }

  delete(pId,index) {
    // console.log(this.loggedUser.uCredentials.uEmail)
    // console.log(pId)
    this.cartService.deleteProduct(this.loggedUser.uCredentials.uEmail,pId).subscribe(
      success => {
        this.pArr.splice(index,1);
        this.calculatePrice();
        this.ngOnInit();
        sessionStorage.setItem('uCart', JSON.stringify(this.pArr));
      },
      error => {this.error = error}
    )
  }

  update(index,productId){
    console.log(index,productId)
    this.loggedUser = new User();
    this.loggedUser.uCredentials.uEmail = sessionStorage.getItem('uEmail');
    this.cartService.updateValues(this.loggedUser.uCredentials.uEmail,this.cart[index].pQuantity,productId)
    .subscribe(
      success => {console.log('success')}
    )
    this.calculatePrice();
  }

  calculatePrice(){
    this.total = 0;
    this.tax = 0;
    this.finalAmount = 0;
    console.log(this.pArr)
    for(let i = 0;i < this.pArr.length; i++){
      this.total+=this.pArr[i].pSeller.pShippingCharges+
      this.cart[i].pQuantity*(this.pArr[i].price-(this.pArr[i].price*this.pArr[i].pSeller.pDiscount))
      this.tax=this.total * (17 / 100);
      this.finalAmount = this.total + this.tax;
    }
    return true;
  }

  navigateProductView(){
    this.router.navigate(['/dashboard']);
  }

  showViaService() {
    this.messageService.add({severity:'error',  detail:'Removed item from cart'});
  }


  orderId:string;
  timeStamp=new Date();
  amount:number=0;
  email:string=sessionStorage.getItem("uEmail");
  cartArr:Cart[];
  checkoutDetails:any;
  updateProduct;
  errorMessage:string="";
  flag:boolean=true;
  checkOut(){
    this.errorMessage="";
    this.orderService.getOrder(this.email).subscribe(
      (data)=>{this.cartArr=data.uCart;
    this.orderService.updateProduct({"uCart":this.cartArr}).subscribe(
      (data)=>{ this.updateProduct=data//this.updateProduct=data,
      if(data == null){
        this.checkoutDetails={"amount":this.finalAmount,"uCart":this.cartArr,"date":this.timeStamp,"email":this.email}
        this.orderService.checkout(this.checkoutDetails).subscribe(
          (data)=>{
          this.orderService.emptyCart({"uCart":this.cartArr,"email":this.email}).subscribe(
          )}
        )}
        this.cartArr=[];
        sessionStorage.setItem('uCart',JSON.stringify(this.cartArr))
        this.router.navigate(["/orders"])
      },
      (error)=>{this.errorMessage=error.error.message}
    )}
  )}
}

