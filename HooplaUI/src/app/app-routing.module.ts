import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//


import { LoginComponent } from './login/login.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { OrdersComponent } from './orders/orders.component';


import { AppComponent } from './app.component';
import { CartComponent } from 'src/app/cart/cart.component';
import { ProfileComponent } from 'src/app/profile/profile.component';
import { ProductDetailsComponent } from 'src/app/product-details/product-details.component';
import { GuardService } from 'src/app/guard.service'
import { AdminComponent } from 'src/app/admin/admin.component'

export const routes: Routes = [

  { path: 'login', component: LoginComponent }, 

 { path: 'register', component: RegisterComponent },
  

  
  // { path: 'home', component: AppComponent },

  { path: 'dashboard', component: DashboardComponent },
  {path:'admin', component:AdminComponent},
  { path: 'cart', component: CartComponent,canActivate:[GuardService] },
  { path: 'orders', component: OrdersComponent },
  { path: 'productDetail/:Id', component: ProductDetailsComponent },
  

  // { path: 'seller/addProduct', component: SellerAddProductComponent },
  // { path: 'seller/viewProduct', component: SellerViewModifyProductComponent }
  //{ path: 'products/:prodName', component: ProductsComponent },
  {path:'profile',component: ProfileComponent},
  { path: '', redirectTo: '/dashboard', pathMatch:'prefix' }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

