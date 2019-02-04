import { Component,HostListener } from '@angular/core';
import { DataService } from './data.service';
import {Router} from "@angular/router";
import 'rxjs/Rx';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
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
    }
  }
  constructor(
    private ds: DataService,
    private router:Router
  ) {   
  }
}
