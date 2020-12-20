import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ProductsListComponent} from "./products-list/products-list.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductsListComponent },
  { path: '**', redirectTo: 'products'}]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
