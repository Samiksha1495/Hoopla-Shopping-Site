import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { UriService } from 'src/app/uri.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  cartMicroService: string;
  constructor(public http:HttpClient,public uriService: UriService) { 
    this.cartMicroService = this.uriService.buildCartMicroServiceUri();
  }

  getAdminData(from,to):Observable<any>{
    console.log(from,to);
    return this.http.get<any>(this.cartMicroService +'getadmin/'+String(from)+'/'+String(to));
  }
}
