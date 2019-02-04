import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.code === "KeyS" &&event.ctrlKey) {
      this.router.navigate(['/']);
    }
  }
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

}
