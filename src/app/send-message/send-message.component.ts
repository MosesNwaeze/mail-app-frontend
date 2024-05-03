import {Component, Inject, OnInit} from '@angular/core';
import {HttpClientService} from "../services/http-client.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrl: './send-message.component.scss'
})
export class SendMessageComponent implements OnInit {
  successMessage!: string;
  errorMessage!: string;
  users!: any[];

  window!: Window

  messageForm = new FormGroup({
    userId: new FormControl<string>('', Validators.required),
    subject: new FormControl<string>('', Validators.required),
    content: new FormControl<string>('', Validators.required),
  })

  constructor(
    private httpClient: HttpClientService,
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  ngOnInit(): void {
    this.window = this.document?.defaultView?.window as Window;
    this.fetchUsers();
  }


  fetchUsers(): void {
    const subURL = 'api/user/';

    this.httpClient.getUsers(subURL)
      .subscribe({
        next: value => {

          const userId = JSON.parse(this.window.localStorage.getItem('userId') as string);

          this.users = value.data.filter((user: { _id: string; }) => user._id !== userId)
        },
        error: err => {
          console.log('Error fetching users<>', err);
        },
        complete: () => {
        }
      })

  }

  send() {
    if (this.messageForm.valid) {
      this.successMessage = '';
      this.errorMessage = '';
      const subURL = 'api/message/send-message';

      this.httpClient.sendMessage(subURL, {...this.messageForm.value})
        .subscribe({
          next: value => {
            this.successMessage = 'Message sent successfully'
          },
          error: err => {
            this.errorMessage = 'Error sending message'
            console.log('Error sending message<>', err)
          },
          complete: () => {
            this.messageForm.reset();
          },
        })
    }
  }
}
