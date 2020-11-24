import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { User,Credentials } from './user';
import { UriService } from '../uri.service';

@Injectable()
export class RegisterService {

  userMicroServiceUrl: string;

  constructor(private http: HttpClient, private uriService: UriService) {
    this.userMicroServiceUrl = this.uriService.buildUserMicroServiceUri();
  }

  

  login(userCredential:Credentials): Observable<User> {
    return this.http.post(this.userMicroServiceUrl+'login',userCredential) as Observable<User>;
  }

  logout(): Observable<User> {
    return this.http.get(this.userMicroServiceUrl+'logout') as Observable<User>;
  }

  getUserDetail(uEmail:string): Observable<User> {
    return this.http.get(this.userMicroServiceUrl+'userDetail', {params:{'uEmail':uEmail}}) as Observable<User>;
  }
 
  registerUser(newUser:User): Observable<any> {
    console.log(newUser)
    return this.http.post(this.userMicroServiceUrl+'register',newUser) as Observable<any>;
  }

  addToCart(data): Observable<any> {
    return this.http.post(this.userMicroServiceUrl+'cart',data) as Observable<any>;
  }
  
  addtoCart(product):Observable<any>{
    this.uriService.userMicroServiceUri.applicationName = 'addToCart';
    return this.http.post<any>(this.uriService.buildUserMicroServiceUri(),product);
  }

}


