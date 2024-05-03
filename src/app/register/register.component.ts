import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClientService} from "../services/http-client.service";
import {LocalStorageService} from "ngx-localstorage";
import {Router} from "@angular/router";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  window!: Window;

  registerForm = new FormGroup({
    first_name: new FormControl<string>('', Validators.required),
    last_name: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required)
  })


  constructor(
    private httpClient: HttpClientService,
    private  localStorage: LocalStorageService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  ngOnInit () {
    this.window = this.document?.defaultView?.window as Window;
  }


  register() {
    console.log(this.registerForm.value);
    if(this.registerForm.valid) {
      const subURL = 'api/auth/signup';

      this.httpClient.registerUser(subURL, {...this.registerForm.value})
        .subscribe({
          next: value => {
                this.window.localStorage.setItem('token', JSON.stringify(value.token));
                this.window.localStorage.setItem('userId', JSON.stringify(value.data?._id));
                this.router.navigate(["/"])
                  .then(r => this.document.location.reload())
          },
          error: err => {
            console.log('Error registering user<>', err)
          },
        })

    }
  }
}
