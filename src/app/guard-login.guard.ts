import { Injectable, inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
//import { CookieService } from 'ngx-cookie-service';

@Injectable({providedIn: 'root'})
  class TokenClass{
    // constructor(private cookies:CookieService){}
    canActivate():boolean{
      // let token:string  = this.cookies.get("Token");
      // if(token === "") return false;
      return true;
    }
}

export const guardLoginGuard: CanActivateFn = (route, state) => {
  return inject(TokenClass).canActivate();
};
