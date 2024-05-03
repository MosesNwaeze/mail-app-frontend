import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClientService} from "../services/http-client.service";
import {Router} from "@angular/router";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required)
  })

  window!: Window;

  constructor(
    private httpClientService: HttpClientService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  ngOnInit(): void {
    this.window = this.document?.defaultView?.window as Window
  }

  login(): void {
    if (!this.loginForm.invalid) {
      const url = 'api/auth/login'
      this.httpClientService.login({...this.loginForm.value}, url)
        .subscribe({
          next: value => {
            console.log(value, 'value<>');
            this.window?.localStorage.setItem('token', JSON.stringify(value.token));
            this.window?.localStorage.setItem('userId', JSON.stringify(value.data._id));
            this.router.navigate(['/']).then(r => this.document.location.reload());
          },
          error: err => {
            console.log('Error in login<>', err)
          },
          complete: () => {
          },
        })

    }
  }
}
