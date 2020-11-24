import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http:HttpClient) { }

  getOrder(email):Observable<any>{
    return this.http.get<Observable<any>>('http://localhost:9000/cart/'+email)
    }
  checkout(data):Observable<any>{
    return this.http.post<Observable<any>>('http://localhost:9000/checkoutInsert',data)
  }

  check(data):Observable<any>{
    return this.http.post<Observable<any>>('http://localhost:9000/checkoutFetch',data)
  }

  updateProduct(data):Observable<any>{
    return this.http.post<Observable<any>>('http://localhost:8000/updateProduct',data)
  }

  emptyCart(data):Observable<any>{
    return this.http.post<Observable<any>>('http://localhost:9000/emptyCart',data)
  }

  cancel(data):Observable<any>{
    return this.http.post<Observable<any>>('http://localhost:9000/cancelOrder',data)
  }

  updateOrder(data):Observable<any>{
    return this.http.post<Observable<any>>('http://localhost:8000/updateOrder',data)
  }

  updateCheckOut(data):Observable<any>{
    return this.http.post<Observable<any>>('http://localhost:9000/updateCheckOut',data)
  }

}
