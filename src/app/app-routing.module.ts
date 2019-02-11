import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillComponent } from './bill/bill.component';
import { ProductComponent } from './product/product.component';
import { Product1Component } from './product1/product1.component';


const routes: Routes = [
  { path: 'bill', component: BillComponent },
  { path: 'product', component: ProductComponent },
  { path: 'product1', component: Product1Component }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
