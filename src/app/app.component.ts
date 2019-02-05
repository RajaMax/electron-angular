import { Component, HostListener } from '@angular/core';
import { DataService } from './data.service';
import { Router } from "@angular/router";
import 'rxjs/Rx';
import { remote, ipcRenderer } from 'electron';


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
        this.router.navigate(['/product']);
        break;
      default:
    }
  }
  constructor(
    private ds: DataService,
    private router: Router
  ) {
    var menu = remote.Menu.buildFromTemplate([{
      label: 'File',
      submenu: [{
        label: 'Open',
        click: () => {
          console.log("render")
          this.router.navigate(['/product']);
        }
      },
      {
        role: 'toggledevtools'
      },
      ]
    }]);
    remote.Menu.setApplicationMenu(menu);
  }
  open() {
    console.log("Open was triggered");
    //ipcRenderer.on('open-file', this.open.bind(this));

  }
}
