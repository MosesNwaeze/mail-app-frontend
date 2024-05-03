import {CanActivateFn, Router, UrlTree} from '@angular/router';
import {inject,} from "@angular/core";
import {DOCUMENT} from "@angular/common";


export const authGuard: CanActivateFn = (route, state): boolean | UrlTree => {

  const router: Router = inject(Router);
  const document: Document = inject(DOCUMENT);
  const window: Window = document?.defaultView?.window as Window;
  if (window.localStorage.getItem('token')) {
    return true
  } else {
    return router.parseUrl('/login');
  }


};
