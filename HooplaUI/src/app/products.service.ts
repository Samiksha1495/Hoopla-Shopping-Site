
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { UriService } from 'src/app/uri.service';

import { Product } from 'src/app/product';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productMicroServiceUri:string
  constructor(private http:HttpClient,private uriService:UriService) {
    this.productMicroServiceUri=this.uriService.buildProductsMicroServiceUri()
   
   }

  getData(category):Observable<Product>{
   return this.http.get<Product>(this.productMicroServiceUri+'getProductByCategory'+'?category='+category) as Observable<any>
   }

  fetch(id):Observable<Product>{
    return this.http.get<Product>(this.productMicroServiceUri+'getProductBy/'+id)
  }
  getByName(name):Observable<Product>{
    return this.http.get<Product>(this.productMicroServiceUri+'getProductByName'+"?pName="+name)
  }
  addtoCart(product):Observable<any>{
    // this.productMicroServiceUri.userMicroServiceUri.applicationName = 'addToCart';
    console.log(product)
    return this.http.post<any>('http://localhost:9000/addToCart',product) as Observable<any>
  }
}
