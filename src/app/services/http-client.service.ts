import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from '../../environments/environment';
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  window: Window = this.document?.defaultView?.window as Window;
  private API_URL = environment.apiURL;
  private readonly token: string = JSON.parse(this.window.localStorage.getItem('token') as string);

  constructor(
    private httpClient: HttpClient,
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  login(data: any, subUrl: string): Observable<any> {
    return this.httpClient.post(`${this.API_URL}${subUrl}`, data);
  }

  getUsers(subURL: string): Observable<any> {
    return this.httpClient.get(`${this.API_URL}${subURL}`,
      {
        headers:
          {
            'Authorization': `Bearer ${this.token}`
          }
      }
    );
  }

  sendMessage(subURL: string, data: any): Observable<any> {
    return this.httpClient.post(`${this.API_URL}${subURL}`, data,
      {
        headers:
          {
            'Authorization': `Bearer ${this.token}`
          }
      }
    );
  }

  readMessage(subURL: string): Observable<any> {
    return this.httpClient.get(`${this.API_URL}${subURL}`,
      {
        headers:
          {
            'Authorization': `Bearer ${this.token}`
          }
      }
    );
  }

  fetchedUserMessages(subURL: string): Observable<any> {
    return this.httpClient.get(`${this.API_URL}${subURL}`,
      {
        headers:
          {
            'Authorization': `Bearer ${this.token}`
          }
      });
  }

  fetchedSingle(subURL: string): Observable<any> {
    return this.httpClient.get(`${this.API_URL}${subURL}`,
      {
        headers:
          {
            'Authorization': `Bearer ${this.token}`
          }
      });
  }

  registerUser(subURL: string, data: any): Observable<any> {
    return this.httpClient.post(`${this.API_URL}${subURL}`, data);
  }

}
