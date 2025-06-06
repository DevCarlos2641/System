import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from './Services/Api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, firstValueFrom, pipe, tap, throwError, timeout } from 'rxjs';

export const loginGuard: CanActivateFn = async (route, state) => {
  const api = inject(ApiService);
  const router = inject(Router);
   try {
    await firstValueFrom(
      api.rememberme().pipe(
        timeout(5000),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        }),
        tap(res=>{
          router.navigate(['/Home'])
        })
      )
    );
  } catch (error) {
  }
  return true;
};
