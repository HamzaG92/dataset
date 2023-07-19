export const environment = {
  production: false,
  apiBaseUrl: '/api',
  oauth: {
    resourceServer: {
      allowedUrls: ['http://localhost:8081', 'https://mma.oxymel.com:8081'],
      sendAccessToken: true,
    },
  },
};
