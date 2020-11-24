import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, ParamMap,Router } from '@angular/router'; // for routing
import { User } from '../login/user';
import {MegaMenuModule} from 'primeng/megamenu';
import { isNullOrUndefined, log } from 'util';
import {AppComponent} from '../app.component'
import { ProductsService } from 'src/app/products.service';
import {ToolbarModule} from 'primeng/toolbar'
import { Product } from 'src/app/product';
// import {MegaMenuModule} from 'primeng/megamenu';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  prodToBeSearched:string;
  categorySelected:string;
  loggedUser:User
  categories:string[]=['Electronics','Furniture','Shoes','Clothing']
  searchKey:string
  // categories:string[];
  errorMessage: string = '';
  slideShow:boolean;
  productShow:boolean;
  collection;
  products:any
  dataSearched:any
  notFound:boolean
  loginMessage:string
  items:any[];
  constructor( private prodserv:ProductsService,private router: Router, private route:ActivatedRoute) { }

  ngOnInit() {
    this.slideShow=true;
    this.productShow=false; 
  }

  searchProducts(searchKey){
   
    if(this.loggedUser.uCredentials.uEmail!=null){
    console.log(searchKey)
    this.slideShow=false;
    this.productShow=true;
    this.categorySelected=null;
    this.prodToBeSearched=searchKey;
    this.searchtext()
    }
    else{
      this.loginMessage="Cannot access products\nPlease login to access the products"
      this.router.navigate(["/login"])
      
    }
  }
  viewProductByCategory(choosenCategory){
    if(this.loggedUser.uCredentials.uEmail!=null){
    this.slideShow=false;
    this.productShow=true;
    this.prodToBeSearched=null;
    this.categorySelected=choosenCategory;
    this.prodserv.getData(this.categorySelected).subscribe(
      (data)=>{this.collection=data;console.log(data)},
      (err)=>this.errorMessage=err.error.message
    )
  }
  else{
    this.loginMessage="Cannot access products\nPlease login to access the products"
    this.router.navigate(["/login"])
    
  }
    // alert("Products related to a particlar category should be shown.");

  }

  ngDoCheck(): void { 
    this.loggedUser = new User();
    this.loggedUser.uCredentials.uEmail = sessionStorage.getItem('uEmail');
    this.loggedUser.uCart = JSON.parse(sessionStorage.getItem('uCart'));
  }

  searchtext() {
    
  if(this.loggedUser.uCredentials.uEmail!=null){
   console.log(this.prodToBeSearched)
   if (this.prodToBeSearched.length > 0) {
    
    this.prodserv.getByName(this.prodToBeSearched).subscribe(
      (data)=>{this.dataSearched=data;this.notFound=true
       
      },
     (err)=>{this.errorMessage=err.error.message;
     this.notFound=false
    } );
    
  }
}
else{
  this.notFound=false
  this.router.navigate(["/login"])
}
return this.notFound
}







}
