import {InjectionToken} from "@angular/core";
import {isPlatformBrowser} from "@angular/common";

export const BROWSER_STORAGE = new InjectionToken<Storage>(
  'Browser Storage',{
    providedIn: 'root',
    factory: () => {
      if(isPlatformBrowser(localStorage)){
        return localStorage
      }
      return localStorage;
    }
  }

)
