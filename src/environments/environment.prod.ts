export const environment = {
  //version: require('../../package.json').version,
  production: true,
  apiBaseUrl: 'http://192.168.104.23:8082/dataset-v1', // l'url de l'api de prod à définir plus tard
  oauth: {
    resourceServer: {
      allowedUrls: ['https://mma.oxymel.com'],
      sendAccessToken: true,
    },
  },
};
