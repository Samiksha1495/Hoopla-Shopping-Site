import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/products.service';
import { Cart } from 'src/app/login/user';
import { Router } from '@angular/router';
import {Message} from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  providers:[MessageService]
})
export class ProductDetailsComponent implements OnInit {
pid:number
data:any
product:any
discountedPrice:number
discount:number
cart:any[]
cartObj:Cart
successMessage:string
errorMessage:string
msgs: Message[] = [];
  constructor(private messageService: MessageService,
    private prodServ:ProductsService,
    private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    
        this.route.params.subscribe(param=>this.pid=param['Id'])
        console.log(this.pid)
        this.prodServ.fetch(this.pid).subscribe(
          data=>{
            this.data=data;console.log(data);
            this.discountedPrice=this.data.price-this.data.pSeller.pDiscount*this.data.price;
            this.discount=this.data.pSeller.pDiscount*100;
            sessionStorage.setItem("uCart", JSON.stringify(this.product.length));
          })
  }

addCart(data){
 
  this.cart=[]
  
  let email=sessionStorage.getItem("uEmail");
  let quantity=sessionStorage.getItem("pQuantity")
  this.cartObj={"p_Id":String(data),"sEmail":email,"pQuantity":Number(1)};
  

  this.cart.push(this.cartObj)
 // this.cart.push(data.pQuantity
  // console.log( this.cart)
  // this.prodServ.addtoCart(this.cartObj).subscribe(
  //   (data)=>{
  //     {this.successMessage=data.message;console.log(this.successMessage)}
  //   },
  //   (error)=>{
  //     this.errorMessage=error.error.message
  //   }
  // )
  // let email=sessionStorage.getItem("uEmail");
  // let quantity=sessionStorage.getItem("pQuantity");
  let cart = sessionStorage.getItem('uCart');
 
  this.cartObj={"p_Id":String(data),"sEmail":email,"pQuantity":Number(1)};
  this.cart.push(this.cartObj) 

 // this.cart.push(data.pQuantity
  console.log( this.cart)
  this.prodServ.addtoCart(this.cartObj).subscribe(
    (data)=>{
      {this.successMessage=data.message;console.log(this.successMessage);
        let mycart = JSON.parse(cart);
        mycart.push(this.cartObj)
          sessionStorage.setItem('uCart',JSON.stringify(mycart))
        ;}
    },
    (error)=>{
      this.errorMessage=error.error.message
    }
  )

}

goBack(){
  this.router.navigate(['/dashboard'])
  
}
showViaService(d) {
  this.messageService.add({severity:'success', summary:d, detail:'Added to cart successfully'});
  return true
}

}
