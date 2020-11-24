import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { ProductsService } from 'src/app/products.service';
import {CardModule, Card} from 'primeng/card';
import {RatingModule} from 'primeng/rating';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/login/register.service';
import { Cart } from 'src/app/login/user';
import {SplitButtonModule} from 'primeng/splitbutton';
// import { message } from 'src/app/message';
import {GrowlModule} from 'primeng/growl';
import {Message} from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import {ProgressBarModule} from 'primeng/progressbar';




@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers:[MessageService]
})
export class ProductsComponent implements OnInit {
  category:string
  msgs: Message[] = [];
  data:any[]
  dataSearch:String
  products:any
  constructor(private messageService: MessageService,
    private route:Router, 
    private prodserv:ProductsService,
    private regesterServ:RegisterService) { }
  prodSearched:string
  show:boolean=false;
  val:number=5
  cart:any[]
  istrue:boolean
  product:any
  errorMessage:string
  successMessage:string
  id:any
  cartObj:Cart;
  items:any[];
  pid:any
  searchShow:boolean
  notFound:boolean=true
  ngOnInit() {
  }
@Input() set notfound(data:boolean){
this.notFound=data
console.log(data)
}
@Input() set categorySelected(category:string){
this.category=category
};

@Input() set SelectedCollection(data:any[]){
  this.data=data
  this.show=true
  this.searchShow=false
}
@Input() set prodToBeSearched(itemSearched:string){
  this.prodSearched=itemSearched
  this.show=false
}
@Input() set dataSearched(products:string){
  
this.dataSearch=products
console.log(this.dataSearch)
this.show=false
this.searchShow=true
this.notFound=true
}
nav(id){
console.log(id)
this.route.navigate(['/productDetail',id])
}
addCart(data){
 console.log(data)
  this.cart=[]
  let email=sessionStorage.getItem("uEmail");
  let quantity=sessionStorage.getItem("pQuantity")
  let cart = sessionStorage.getItem("uCart");
  console.log(data)
 
  this.cartObj={"p_Id":String(data),"sEmail":email,"pQuantity":Number(1)};

  this.cart.push(this.cartObj)
 // this.cart.push(data.pQuantity
  this.prodserv.addtoCart(this.cartObj).subscribe(
    (data)=>{
      {
        this.successMessage=data.message;
        console.log(this.successMessage);
        let mycart = JSON.parse(cart);
        mycart.push(this.cartObj)
        sessionStorage.setItem('uCart',JSON.stringify(mycart))
      }
    },
    (error)=>{
      this.errorMessage=error.error.message
    }
  )
return true
}

showViaService(d) {
  this.messageService.add({severity:'success', summary:d, detail:'Successfully added to cart '});
  return true
}
}
