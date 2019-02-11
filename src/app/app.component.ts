import { Component, HostListener } from '@angular/core';
import { DataService } from './data.service';
import { DataService1 } from './data1.service';

import { Router } from "@angular/router";
import 'rxjs/Rx';
import { remote, ipcRenderer } from 'electron';
import { NetworkConnection, ConnectionStatusEnum } from './network';
import { timeInterval } from 'rxjs/operator/timeInterval';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch (true) {
      case (event.code === "KeyB" && event.ctrlKey):
        this.router.navigate(['/bill']);
        break;
      case (event.code === "KeyP" && event.ctrlKey):
        this.router.navigate(['/product1']);
        break;
      default:
    }
  }
  value: any;
  constructor(
    private ds: DataService1,
    private router: Router
  ) {
    var menu = remote.Menu.buildFromTemplate([{
      label: 'File',
      submenu: [{
        label: 'Open',
        click: () => {
          console.log("render")
          this.router.navigate(['/product1']);
        },

      },
      {
        role: 'toggledevtools'
      },
      {
        role: 'reload'
      },
      ]
    }]);
    remote.Menu.setApplicationMenu(menu);
    window.addEventListener("online", this.checkConnection.bind(this), false);
    window.addEventListener("offline", this.checkConnection.bind(this), false);
    this.checkConnection()
    sessionStorage.setItem("value", "save data");
    this.value = sessionStorage.getItem("value")

  }
  open() {
    console.log("Open was triggered");
    //ipcRenderer.on('open-file', this.open.bind(this));

  }
  online: Boolean = true;
  timeInterval: any;

  check: Boolean = true;

  checkConnection() {
    this.ds.checkOnline();
    this.online = navigator.onLine;
    console.log("status of work")
    console.log(NetworkConnection.status + "  , " + navigator.onLine);
    this.ds.checkStatusCall().subscribe((res) => {
      console.log("online")
      this.online = true;
      console.log(timeInterval)
      clearInterval(this.timeInterval);
      this.check = true;
    }, err => {
      console.error(err)
      console.log("offline" + " status")
      this.online = false;
      console.log("this.online", this.online);
      if (this.check) {
        this.check = false;
        this.timeInterval = setInterval(() => {
          this.checkConnection();
        }, 5000);
      }

    });

  }

}
