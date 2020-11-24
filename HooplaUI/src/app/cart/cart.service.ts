import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UriService } from 'src/app/uri.service';
import {Cart} from 'src/app/login/user';
import { Product } from 'src/app/cart/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartMicroService: string;
  constructor(public http: HttpClient, public uriService: UriService) {
    this.cartMicroService = this.uriService.buildCartMicroServiceUri();
  }

  getData(data: any): Observable <Cart> {
    return this.http.get<Cart>(this.cartMicroService + 'cart/' + data);
  }

  getProducts(p_Id): Observable <Product> {
    return this.http.get<Product>(this.cartMicroService + 'getProducts/' + p_Id);
  }

  deleteProduct(email, id): Observable<any> {
    console.log(email, id);
    return this.http.delete<any>(this.cartMicroService + 'deleteCart/' + email + '/' + id);
  }

  updateValues(email, quantity, productID): Observable<Cart> {
    return this.http.post<Cart>(this.cartMicroService + 'updateQuantity/',
    {'email' : email, 'quantity' : quantity, 'productID' : productID}
  );
  }

  


}
