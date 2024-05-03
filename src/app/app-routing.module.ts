import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {MessagesComponent} from "./messages/messages.component";
import {MessagesDetailsComponent} from "./messages-details/messages-details.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {authGuard} from "./guards/auth.guard";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {SendMessageComponent} from "./send-message/send-message.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'messages',
    component: MessagesComponent,
    canActivate: [authGuard]
  },
  {
    path: 'message-details/:messageId',
    component: MessagesDetailsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'send-message',
    component: SendMessageComponent,
    canActivate: [authGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
