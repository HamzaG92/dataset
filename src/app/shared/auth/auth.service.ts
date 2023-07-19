import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { filter, first, map } from 'rxjs/operators';
import { OAuthEvent, OAuthService } from 'angular-oauth2-oidc';

import { authConfig } from './auth.config';
import { UserInfo } from 'angular-oauth2-oidc/types';

import {
  BehaviorSubject,
  combineLatest,
  Observable,
  ReplaySubject,
} from 'rxjs';

@Injectable()
export class AuthService {
  private isAuthenticatedSubject$ = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();

  private isDoneLoadingSubject$ = new ReplaySubject<boolean>();
  public isDoneLoading$ = this.isDoneLoadingSubject$.asObservable();

  /**
   * Publishes `true` if and only if (a) all the asynchronous initial
   * login calls have completed or errorred, and (b) the user ended up
   * being authenticated.
   *
   * In essence, it combines:
   *
   * - the latest known state of whether the user is authorized
   * - whether the ajax calls for initial log in have all been done
   */
  public canActivateProtectedRoutes$: Observable<boolean> = combineLatest([
    this.isAuthenticated$,
    this.isDoneLoading$,
  ]).pipe(map((values) => values.every((b) => b)));

  constructor(
    private router: Router,
    private location: Location,
    private oauthService: OAuthService
  ) {
    this.oauthService.configure(authConfig);
    sessionStorage.setItem('flow', 'code');

    // This is tricky, as it might cause race conditions (where access_token is set in another
    // tab before everything is said and done there.
    // TODO: Improve this setup. See: https://github.com/jeroenheijmans/sample-angular-oauth2-oidc-with-auth-guards/issues/2
    window.addEventListener('storage', (event) => {
      if (
        (event.key === 'auth_data_updated' && event.newValue !== null) ||
        event.key === null
      ) {
        this.isAuthenticatedSubject$.next(
          this.oauthService.hasValidAccessToken()
        );

        if (!this.oauthService.hasValidAccessToken()) {
          this.navigateToLoginPage();
        }
      }
    });

    // Automatic redirect to login page
    this.oauthService
      .loadDiscoveryDocumentAndTryLogin({
        onTokenReceived: (info) => {
          console.log('onTokenReceived');
          console.log('onTokenReceived - state', info.state);
        },
      })
      .then(() => {
        this.isAuthenticatedSubject$.next(
          this.oauthService.hasValidAccessToken()
        );
        this.isDoneLoadingSubject$.next(true);
      })
      .catch(() => this.isDoneLoadingSubject$.next(true));

    // Automatically load user profile
    this.oauthService.events
      .pipe(
        filter((e) => e.type === 'token_received'),
        first()
      )
      .subscribe((event: OAuthEvent) => {
        if (this.oauthService.state)
          this.router.navigateByUrl(
            decodeURIComponent(this.oauthService.state)
          );
      });

    this.oauthService.events.subscribe((_) => {
      this.isAuthenticatedSubject$.next(
        this.oauthService.hasValidAccessToken()
      );
    });

    this.oauthService.events
      .pipe(filter((e) => ['token_received'].includes(e.type)))
      .subscribe((e) => this.oauthService.loadUserProfile());

    this.oauthService.events
      .pipe(
        filter((e) => ['session_terminated', 'session_error'].includes(e.type))
      )
      .subscribe((e) => this.navigateToLoginPage());

    this.oauthService.setupAutomaticSilentRefresh();
  }

  set requestAccessToken(value: boolean) {
    this.oauthService.requestAccessToken = value;
    localStorage.setItem('requestAccessToken', '' + value);
  }

  get requestAccessToken() {
    return this.oauthService.requestAccessToken;
  }

  set useHashLocationStrategy(value: boolean) {
    const oldValue = localStorage.getItem('useHashLocationStrategy') === 'true';
    if (value !== oldValue) {
      localStorage.setItem('useHashLocationStrategy', value ? 'true' : 'false');
      window.location.reload();
    }
  }

  get useHashLocationStrategy() {
    return localStorage.getItem('useHashLocationStrategy') === 'true';
  }

  get id_token() {
    return this.oauthService.getIdToken();
  }

  get access_token() {
    return this.oauthService.getAccessToken();
  }

  get id_token_expiration() {
    return this.oauthService.getIdTokenExpiration();
  }

  get access_token_expiration() {
    return this.oauthService.getAccessTokenExpiration();
  }

  get logged() {
    return (
      this.oauthService.hasValidAccessToken() &&
      this.oauthService.hasValidIdToken()
    );
  }

  get fullName() {
    return `${this.givenName} ${this.familyName}`;
  }

  get givenName() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }

    // @ts-ignore
    return claims.given_name;
  }

  get familyName() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }

    // @ts-ignore
    return claims.family_name;
  }

  get email() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }

    // @ts-ignore
    return claims.email;
  }

  get grantedScopes(): string[] {
    const grantedScopes = this.oauthService.getGrantedScopes() as string[];
    return grantedScopes[0].split(' ');
  }

  get groups(): string[] {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }

    // @ts-ignore
    return claims.groups;
  }

  get isAdmin(): boolean {
    const groups = this.groups;
    if (!groups) {
      return false;
    }

    return groups.includes('MMA Admins');
  }

  get isManager(): boolean {
    const groups = this.groups;
    if (!groups) {
      return false;
    }

    return groups.includes('MMA Managers');
  }

  get isUser(): boolean {
    const groups = this.groups;
    if (!groups) {
      return false;
    }

    return groups.includes('MMA Users');
  }

  hasGrantedScope(scope: string) {
    return this.grantedScopes.includes(scope);
  }

  logout() {
    this.oauthService.logOut();
  }

  refreshToken() {
    this.oauthService
      .refreshToken()
      .then((info) => console.log('refresh ok', info))
      .catch((err) => console.error('refresh error', err));
  }

  loadUserProfile(): Promise<UserInfo> {
    return this.oauthService.loadUserProfile() as Promise<UserInfo>;
  }

  /*
  async loginCodeInPopup() {
    // Tweak config for code flow
    this.oauthService.configure(authConfig);
    await this.oauthService.loadDiscoveryDocument();
    sessionStorage.setItem('flow', 'code');

    this.oauthService.initLoginFlowInPopup().then(() => {
      this.oauthService.loadUserProfile().then(up => (this.userProfile = up));
    });
  }
  */

  navigateToLoginPage(targetUrl?: string) {
    // This would directly (w/o user interaction) redirect the user to the
    // login page if they are not already logged in.
    this.oauthService
      .loadDiscoveryDocumentAndTryLogin({
        onTokenReceived: (info) => {
          console.log('onTokenReceived');
          console.log('onTokenReceived - state', info.state);
        },
      })
      .then(() => {
        this.isAuthenticatedSubject$.next(
          this.oauthService.hasValidAccessToken()
        );

        if (!this.oauthService.hasValidAccessToken()) {
          this.oauthService.initLoginFlow(targetUrl || this.router.url);
        }
      });
  }
}
