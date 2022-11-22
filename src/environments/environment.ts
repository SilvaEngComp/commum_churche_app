/* eslint-disable @typescript-eslint/naming-convention */
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // API: 'http://127.0.0.1:8000/api/v1',
  // API2: 'http://127.0.0.1:8000/api/v2',
  // IMAGE_URL: 'http://127.0.0.1:8000/storage/',
  API: 'https://api.ambienteteste.enginydigitaleco.com/commum_ibnovabetel_api/public/api/v1',
  API2: 'https://api.ambienteteste.enginydigitaleco.com/commum_ibnovabetel_api/public/api/v2',
  IMAGE_URL:
    'https://api.ambienteteste.enginydigitaleco.com/commum_ibnovabetel_api/public/api/storage/',

  PRIVATEKEY: 'QUBjZW1lY2FkZUBlbmdpbnlkaWdpdGFsZWNvLmNvbQ==', // ...

  LOCALSTORAGE: 'ibnovabetel.',

  firebaseConfig: {
    apiKey: 'AIzaSyC3wIqvObcuZKDO4QxAMQBN1v1-K8RqzBo',
    authDomain: 'loved-husband.firebaseapp.com',
    projectId: 'loved-husband',
    storageBucket: 'loved-husband.appspot.com',
    messagingSenderId: '559954006298',
    appId: '1:559954006298:web:f47a7580839c3306d91ca3',
    measurementId: 'G-1P07FE2V3K',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
