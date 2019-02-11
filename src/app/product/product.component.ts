import { Component, OnInit, HostListener } from '@angular/core';
import { DataService } from '../data.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.code === "KeyS" && event.ctrlKey) {
      this.addProduct()
    }
  }
  db: any;
  records: any = [];
  nonCloduData: any = [];
  myGroup = new FormGroup({
    product: new FormControl(),
    stock: new FormControl()

  });
  constructor(
    private ds: DataService,
    private router: Router,
    private http: HttpClient

  ) { }

  ngOnInit() {
    this.initialFunciton();
    setInterval(() => {
      this.initialFunciton();
    }, 3000);
  }
  initialFunciton() {
    console.log("initial")
    this.ds.getNonCloudData().then((arrayData) => {
      console.log(arrayData)
      this.nonCloduData = arrayData;
      console.log(navigator.onLine)
      if (navigator.onLine) {
        this.nonCloduData.forEach(element => {
          this.toMoveCloud(element);
        });
      }
    }).catch((err) => console.error(err));

    this.ds.getData().then((docs) => {
      this.records = docs;
    }).catch((err) => console.error(err));
  }
  addProduct() {
    this.ds.addRecord(this.myGroup.value)
      .then((docs) => {
        console.log("navigator " + navigator.onLine)
        if (navigator.onLine) {
          this.ds.addCloudProduct(this.myGroup.value).subscribe(data => {
            console.log(data)
            this.myGroup.value.product = "";
            this.myGroup.value.stock = "";
            this.ds.changeStatus(docs,data._id).then(() => {
              this.initialFunciton();
            });
          })
        }
      })
      .catch((err) => console.error(err));
  }
  delete(record) {
    if(record.cloud_id){
      this.ds.changeStatusforDelete(record)
      .then((docs) => {
        this.initialFunciton()
      })
      .catch((err) => console.error(err));
    }else{
      this.ds.deleteRecord(record)
      .then((docs) => {
        this.initialFunciton()
      })
    }
   
  }
  toMoveCloud(data) {
    console.log("move");
    console.log(data)
    if(data.status==="add"){
      this.ds.addCloudProduct(data).subscribe(data1 => {
        this.ds.changeStatus(data,data1._id).then(() => {
        });
      })
    }else if(data.status==="edit"){

    }else if(data.status==="delete"){
      console.log("toMoveCloud delete")
      this.ds.deleteCloudProduct(data.cloud_id).subscribe(data1 => {
        this.ds.deleteRecord(data)
        .then((docs) => {
        })
        .catch((err) => console.error(err));
      })
    }
    
  }

}
