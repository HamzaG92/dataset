import { Injectable } from "@angular/core";

import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthService } from "./auth.service";
import { filter, switchMap, tap } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.authService.isDoneLoading$.pipe(
      filter(isDone => isDone),
      switchMap(_ => this.authService.isAuthenticated$),
      tap(isAuthenticated => isAuthenticated || this.authService.navigateToLoginPage(state.url)),
    );
  }
}
