import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { firstValueFrom, timeout, catchError, throwError, tap } from 'rxjs';
import { ApiService } from './Services/Api.service';

export const rememberGuardChild: CanActivateChildFn = async (childRoute, state) => {
  return verific()
};

export const rememberGuard: CanActivateFn = async (route, state) => {
  return verific()
};


async function verific():Promise<boolean>{
  const api = inject(ApiService);
  const router = inject(Router);
   try {
    await firstValueFrom(
      api.rememberme().pipe(
        timeout(5000),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
      )
    );
    return true;
  } catch (error) {
    router.navigate(['/']);
    return false;
  }
}
