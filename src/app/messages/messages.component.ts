import {Component, Inject, OnInit} from '@angular/core';
import {LocalStorageService} from "ngx-localstorage";
import {HttpClientService} from "../services/http-client.service";
import {Router} from "@angular/router";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent implements OnInit {

 window!: Window;

messages!: any[];
  constructor(
    private localStorage: LocalStorageService,
    private httpClient: HttpClientService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  ngOnInit(): void {

    this.window = this.document?.defaultView?.window as Window;

    const userId = JSON.parse(this.window.localStorage.getItem('userId') as string);

    this.fetchedMessages(userId);

  }


  fetchedMessages(userId: string): void {
     const subURL = `api/message/${userId}`
     this.httpClient.fetchedUserMessages(subURL)
       .subscribe({
         next: value => {
           this.messages = value.data.messages
           console.log(value, 'value<>');
         },
         error: err => {
           console.log('Error fetching messages<>', err)
         },
         complete: () => {},
       })
  }

  showDetails(message: any): void  {
    console.log(message, 'message<>')
    this.router.navigate([`/message-details/${message?._id}`])
      .then(r=>console.log(r));
  }
}
