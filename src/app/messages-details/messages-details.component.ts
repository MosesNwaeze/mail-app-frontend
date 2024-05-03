import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClientService} from "../services/http-client.service";

@Component({
  selector: 'app-messages-details',
  templateUrl: './messages-details.component.html',
  styleUrl: './messages-details.component.scss'
})
export class MessagesDetailsComponent implements OnInit {

  messageId!: string;
  message!: any


  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClientService,
  ) {
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(param =>
      this.messageId = param.get('messageId') as string
    )

    this.fetchMessage(this.messageId);
  }

  fetchMessage(messageId: string): void {
    const subURL = `api/message/single/${messageId}`;

    this.httpClient.fetchedSingle(subURL)
      .subscribe({
        next: value => {
          this.message = value.data;
        },
        error: err => {
          console.log('Error fetching message<>', err)
        },
        complete: () => {
          const subURL = `api/message/read-message/${messageId}`;
          this.httpClient.readMessage(subURL)
            .subscribe({
              next: value => {
                console.log(value.data);
              },
              error: err => {
                console.log('Error marking message as read<>', err)
              }
            })
        },
      })
  }

}
