import {Component, Inject, OnInit} from '@angular/core';
import {LocalStorageService} from "ngx-localstorage";
import {DOCUMENT, Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  window!: Window
  token!: string
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.window = this.document?.defaultView?.window as Window;
    this.token = JSON.parse(this.window.localStorage.getItem('token') as string);
  }

  logout(): void {
     this.window.localStorage.clear();
     this.router.navigate(['/login'])
       .then(r=>this.document.location.reload());
  }
}
