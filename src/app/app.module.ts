import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { DataService1 } from './data1.service';

import { BillComponent } from './bill/bill.component';
import { AppRoutingModule } from './/app-routing.module';
import { ProductComponent } from './product/product.component';
import { HttpClientModule } from '@angular/common/http';
import { Product1Component } from './product1/product1.component';


@NgModule({
  declarations: [
    AppComponent,
    BillComponent,
    ProductComponent,
    Product1Component,
  ],
  imports: [
    BrowserModule,
    // other imports ...
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [DataService,DataService1],
  bootstrap: [AppComponent]
})
export class AppModule { }


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/