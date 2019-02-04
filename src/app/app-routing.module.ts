import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{BillComponent} from './bill/bill.component';
import{ProductComponent} from './product/product.component';

const routes: Routes = [
  { path: 'bill', component: BillComponent },
  { path: 'product', component: ProductComponent },
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
