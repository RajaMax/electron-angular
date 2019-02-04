import { Component,HostListener } from '@angular/core';
import * as Datastore from 'nedb';
import { DataService } from './data.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {Router} from "@angular/router";
import { SwitchView } from '@angular/common/src/directives/ng_switch';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/Rx';


@Component({
  selector: 'app-root',
  // host: { '(window:keydown)': 'doSomething($event)' },
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // db: any;
  // records: any = [];
  isCon:Boolean;
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch(true) {
      case (event.code === "KeyB" &&event.ctrlKey):
        this.router.navigate(['/bill']); 
        break;
      case (event.code === "KeyP" &&event.ctrlKey):
      this.router.navigate(['/product']); 
        break;
      default:
        // code block
    }
    // if (event.code === "KeyB" &&event.ctrlKey) {
    //   this.router.navigate(['/bill']); 
    // }
  }
  // doSomething(event) {

  // }
  // myGroup = new FormGroup({
  //   product: new FormControl(),
  //   stock: new FormControl()

  // });
  constructor(
    private ds: DataService,
    private router:Router
  ) {
    var filepath = __dirname + '/' + "product";
    this.isCon = navigator.onLine;
    // this.db = new Datastore({ filename: filepath });
    // this.db.loadDatabase(function (err) {

    // });
    //this.OnInit()
  }
  // OnInit() {
  //   this.ds.getData()
  //     .then((docs) => {
  //       this.records = docs;
  //     })
  //     .catch((err) => console.error(err));
  // }

  // addProduct() {
  //   this.ds.addRecord(this.myGroup.value)
  //     .then((docs) => {
  //       this.myGroup.value.product = "";
  //       this.myGroup.value.stock = "";
  //       this.OnInit()
  //     })
  //     .catch((err) => console.error(err));
  // }
  // delete(record) {
  //   this.ds.deleteRecord(record)
  //     .then((docs) => {
  //       this.OnInit()
  //     })
  //     .catch((err) => console.error(err));
  // }
}
