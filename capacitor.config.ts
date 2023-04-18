/* eslint-disable @typescript-eslint/naming-convention */
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.enginydigitaleco.commum.ibnb',
  appName: 'IB Nova Betel',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    LocalNotifications: {
      smallIcon: './src/assets/icons/app_icons/58.png',
      iconColor: '#024152',
      sound: 'beep.wav',
    },
  },
};

export default config;
