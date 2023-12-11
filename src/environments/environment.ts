/* eslint-disable @typescript-eslint/naming-convention */
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API: 'http://127.0.0.1:8000/api/v1',
  API2: 'http://127.0.0.1:8000/api/v2',
  API3: 'http://127.0.0.1:8000/api/v3',
  TEST: true,

  // API: 'https://api.ambienteteste.enginydigitaleco.com/commum_ibnovabetel_api/public/api/v1',
  // API2: 'https://api.ambienteteste.enginydigitaleco.com/commum_ibnovabetel_api/public/api/v2',
  // API3: 'https://api.ambienteteste.enginydigitaleco.com/commum_ibnovabetel_api/public/api/v3',
  // TEST: true,

  // API: 'https://apis3.enginydigitaleco.com/commum_ibnovabetel_api/public/api/v1',
  // API2: 'https://apis3.enginydigitaleco.com/commum_ibnovabetel_api/public/api/v2',
  // API3: 'https://apis3.enginydigitaleco.com/commum_ibnovabetel_api/public/api/v3',
  // TEST: false,

  PRIVATEKEY: 'QUBjZW1lY2FkZUBlbmdpbnlkaWdpdGFsZWNvLmNvbQ==', // ...
  BASE_URL: 'https://www.ibnovabetel.enginydigitaleco.com',
  LOCALSTORAGE: 'ibnovabetel.',

  firebaseConfig: {
    apiKey: 'AIzaSyC5dA_afnY3Psp55WOibvGPO5mXk5fIYGU',
    authDomain: 'ibnb-commum.firebaseapp.com',
    projectId: 'ibnb-commum',
    storageBucket: 'ibnb-commum.appspot.com',
    messagingSenderId: '93614175371',
    appId: '1:93614175371:web:d36b4faf2f07fcbf49d08e',
    measurementId: 'G-FDB5BKH636',
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
