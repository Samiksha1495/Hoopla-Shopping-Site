import { Component, OnInit } from '@angular/core';
import { Cart } from '../login/user';
import { OrdersService } from '../orders.service';
import {PanelModule} from 'primeng/panel';
import {Message} from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private messageService: MessageService,public orderService: OrdersService) { }
  email:string=sessionStorage.getItem("uEmail");
  totalOrders:any;
  firstOrder:any;
  cancelErrorMesssage:string;
  flag:boolean=false;
  qtyVal:number=0;
  prod:any[];
  successUpdateMessage:string;
  errorUpdateMessage:string;
  amountDetails:any;
  totalAmount:number;
  msgs: Message[] = [];
  fetchData(){
    this.prod=[];
    this.orderService.check({"email":this.email}).subscribe(
      (data)=>{this.totalOrders=data;
        if(this.totalOrders!=null){
        this.firstOrder=this.totalOrders.splice(-1)
        for(let i of this.firstOrder[0].uCart){
          this.prod.push({"p_Id":i.p_Id,"quantity":i.pQuantity})
        }
        }
      })
  }
  
  ngOnInit() {
      this.fetchData()
    }

  cancelOrder(){
    this.orderService.cancel({"orderId":this.firstOrder[0].orderId}).subscribe(
      (data)=>{
        this.fetchData()
      },
      (error)=>this.cancelErrorMesssage=error.error.message
    )
  }

  editOrder(){
    this.flag = true
  }

  goBack(){
    this.fetchData()
    this.flag = false
    this.successUpdateMessage="";
    this.errorUpdateMessage="";
    return this.flag
  }

  confirmOrder(pid,quantity){
    this.successUpdateMessage="";
    this.errorUpdateMessage="";
    let qty:number;
    for(let i of this.prod){
      if(i.p_Id == pid){
        qty = quantity - i.quantity;
      }
    }
    this.orderService.updateOrder({"p_Id":pid,"quantity":qty}).subscribe(
      (data)=>{this.amountDetails = data;
        if(qty>0){
        this.totalAmount=this.firstOrder[0].amount + 
        (this.amountDetails.shipping_charges+qty*(this.amountDetails.price -
          (this.amountDetails.price * this.amountDetails.discount))) + 
          (this.amountDetails.shipping_charges+qty * 
            (this.amountDetails.price - 
              (this.amountDetails.price*this.amountDetails.discount))*17/100)
        }else{
          this.totalAmount=this.firstOrder[0].amount - 
          (this.amountDetails.shipping_charges+Math.abs(qty)*
          (this.amountDetails.price-(this.amountDetails.price*this.amountDetails.discount))) - 
          (this.amountDetails.shipping_charges+Math.abs(qty)*(this.amountDetails.price-
            (this.amountDetails.price*this.amountDetails.discount)))+(this.amountDetails.shipping_charges+qty*
              (this.amountDetails.price-(this.amountDetails.price*this.amountDetails.discount))*17/100)

        }
        this.orderService.updateCheckOut(
          {"orderId":this.firstOrder[0].orderId,"p_Id":pid,"quantity":quantity,"amount":this.totalAmount}
        ).subscribe(
          (data)=>{
            this.flag=false;
            this.fetchData()
          },
          (error)=>{this.errorUpdateMessage = error.error.message}
        )
      },
      (error)=>{this.errorUpdateMessage = error.error.message}
    )
  }
    
  showViaService(d) {
    this.messageService.add({severity:'success', summary:d, detail:'Your order will be updated'});
    return true
  }
  
}
