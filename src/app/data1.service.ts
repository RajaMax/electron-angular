import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import * as Datastore from 'nedb';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService1 {
    appOnline: Boolean = false;
    db: any;
    endPoint: string = 'http://localhost:30001';
    notAddCall: Boolean = true;
    constructor(
        private http: HttpClient
    ) {
        this.checkOnline()
        var filepath = __dirname + '/' + "product_db";
        this.db = new Datastore({ filename: filepath });
        this.db.loadDatabase(function (err) {
        });
    }
    /**
    *
    * @param {AddProjectData}
    * @returns {Observable<User>}
    * @memberof AuthService
    */

    checkOnline() {
        console.log("navigation" + navigator.onLine);
        this.appOnline = navigator.onLine;
        if (this.appOnline) {
            var nonCloduData: any = []
            this.getNonCloudData().then((arrayData) => {
                console.log(arrayData)
                nonCloduData = arrayData;
                if (this.appOnline) {
                    nonCloduData.forEach(element => {
                        this.toMoveCloud(element);
                    });
                }
            }).catch((err) => console.error(err));
        }
        return navigator.onLine;
    }

    toMoveCloud(data) {
        console.log("move");
        console.log(data)
        if (data.status === "add") {
            this.addCloudProduct(data).subscribe(data1 => {
                this.changeStatus(data, data1._id).then(() => {
                });
            })
        } else if (data.status === "edit") {

        } else if (data.status === "delete") {
            console.log("toMoveCloud delete")
            this.deleteCloudProduct(data.cloud_id).subscribe(data1 => {
                this.deleteRecord(data)
                    .then((docs) => {
                    })
                    .catch((err) => console.error(err));
            })
        }

    }

    
    getData() {
        return new Promise((resolve, reject) => {
            var obj = {}
            //var obj = {status: { $nin: ['delete'] }};
            this.db.find(obj, function (err, docs) {
                if (err) reject(err);
                resolve(docs);
            });
        })
    }
    getNonCloudData() {
        return new Promise((resolve, reject) => {
            this.db.find({ isCloud: false }, function (err, docs) {
                if (err) reject(err);
                resolve(docs);
            });
        })
    }

    getColudData(): Observable<any> {
        var url = this.endPoint + "/product"
        return this.http.get<any>(url)
            .map(res => {
                if (res.code === 403) {
                    return res;
                } else {

                    return res.data ? res.data : [];
                }
            })
            .do(
                _ => _,
                () =>
                    console.log("error")
            );
    }
    deleteRecord(record) {
        return new Promise((resolve, reject) => {
            this.db.remove({ _id: record._id }, function (err, numRemoved) {
                if (err) reject(err);
                resolve(numRemoved);
            });
        })
    }
    addRecord(record) {
        record.isCloud = false;
        record.status = "add";
        record.cloud_id = "";
        return new Promise((resolve, reject) => {
            this.db.insert(record, function (err, record) {
                if (err) reject(err);
                resolve(record);
            });
        })
    }
    addCloudProduct(data): Observable<any> {
        if (this.notAddCall) {
            this.notAddCall = false
            var url = this.endPoint + "/product"
            return this.http
                .post<any>(url, data, {
                    observe: "response"
                })
                .map(res => {
                    const product = res.body;
                    this.notAddCall = true
                    return product;
                })
                .do(
                    _ => _,
                    () => {
                        this.notAddCall = true
                        console.log("error")
                    }
                );
        }

    };
    deleteCloudProduct(id): Observable<any> {
        var url = this.endPoint + "/product/" + id
        return this.http
            .delete<any>(url, {
                observe: "response"
            })
            .map(res => {
                const user = res.body.data;
                return user;
            })
            .do(
                _ => _,
                () =>
                    console.log("error")
            );
    };
    changeStatus(data, cloudId) {
        console.log("changeStatus");
        console.log("cloudId " + cloudId)
        var obj = {}
        if (cloudId) {
            obj = { isCloud: true, status: data.status, cloud_id: cloudId }
        } else {
            obj = { isCloud: true, status: data.status }
        }
        return new Promise((resolve, reject) => {
            this.db.update({ _id: data._id }, { $set: obj }, function (err, record) {
                if (err) reject(err);
                resolve(record);
            });
        })
    }
    changeStatusforDelete(data) {
        console.log("delete changeStatus");
        var obj = { isCloud: false, status: "delete" }
        return new Promise((resolve, reject) => {
            this.db.update({ _id: data._id }, { $set: obj }, function (err, record) {
                if (err) reject(err);
                resolve(record);
            });
        })
    }
    checkStatusCall() {
        console.log("delete changeStatus");
        var obj = { isCloud: false, status: "delete" }
        var url = this.endPoint + "/checkstatus"
        return this.http
            .get<any>(url, {
                observe: "response"
            })
            .map(res => {
                return true;
            })
            .do(
                _ => _,
                () =>{
                    return false;
                }
            );
    }
}






