import { HttpInterceptorFn } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const InterceptorCookieInterceptor: HttpInterceptorFn = (req, next) => {
  const cookies = inject(CookieService);
  req = req.clone({
      withCredentials: true
  })
  return next(req);
};
