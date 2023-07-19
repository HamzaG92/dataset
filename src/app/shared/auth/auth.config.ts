import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'https://auth.oxymel.com/auth/realms/oxymel',
  redirectUri: window.location.origin + '/datasets',
  clientId: 'dataset',
  dummyClientSecret: 'ac42bc12-33bb-438b-bafb-554d194c5411',
  responseType: 'code',
  scope: 'openid profile email',
  silentRefreshRedirectUri: `${window.location.origin}/silent-refresh.html`,
  useSilentRefresh: false,
  showDebugInformation: true,
  sessionChecksEnabled: true,
  timeoutFactor: 0.75,
  requireHttps: false,
  // disablePKCI: true,
  clearHashAfterLogin: false,
};
