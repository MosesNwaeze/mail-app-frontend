import {Component, Inject, OnInit} from '@angular/core';
import {HttpClientService} from "../services/http-client.service";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  messages =  [];
  closedMessages = [];
  user!: any;

  window!: Window

  constructor(
    private httpClientService: HttpClientService,
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  ngOnInit(): void {
    this.window = this.document?.defaultView?.window as Window;
    const userId = JSON.parse(this.window.localStorage.getItem('userId') as string);
    this.fetchMessages(userId);

  }

  fetchMessages(userId: string): void {

    const subUrl = `api/message/${userId}`;

    this.httpClientService
      .fetchedUserMessages(subUrl)
      .subscribe({
        next: value => {
          this.messages = value.data.messages;
          this.user = value.data.user;
          this.closedMessages = this.messages.filter((message: {is_read: boolean}) => message?.is_read === false);
        },
        error: error => {
          console.log('Error fetching messages<>', error)
        },
        complete: () => {

        }
      })

  }

}
