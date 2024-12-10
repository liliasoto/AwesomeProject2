/**
 * @format
 * */


import {AppRegistry, PermissionsAndroid, Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';
import App from './App';
import {name as appName} from './app.json';

// Solicitar permisos para notificaciones en Android 13+
if (Platform.OS === "android" && Platform.Version >= 33) {
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)
    .then((result) => {
      if (result === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Notification permission granted");
      } else {
        console.log("Notification permission denied");
      }
    })
    .catch((error) => {
      console.error("Permission request error:", error);
    });
}

// Configuración de Push Notifications
PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,
});

PushNotification.createChannel(
  {
    channelId: "default-channel-id2", // Asegúrate de que sea único
    channelName: "Default Channel",
    channelDescription: "This is the default channel", // Agrega una descripción válida
    playSound: true,
    soundName: "default", // Usa "default" para probar
    importance: PushNotification.Importance.HIGH, // Usa la constante de importancia
    vibrate: true,
  },
  (created) => console.log(`Channel created: ${created ? "yes" : "no"}`) // Confirma si el canal se creó
);

AppRegistry.registerComponent(appName, () => App);


/*
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import React from 'react'
import configureStore from './store';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { Platform } from 'react-native';
const store = configureStore();

PushNotification.configure({
    onRegister: function (token) {
      //console.log("TOKEN:", token);
    },

    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    onAction: function (notification) {
      console.log("ACTION:", notification.action);
      console.log("NOTIFICATION:", notification);
  
      // process the action
    },

    onRegistrationError: function(err) {
      console.error(err.message, err);
    },
  
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: Platform.OS === 'ios'
  });
  

const RNRedux = () => {
    return(
    <Provider store={store}>
        <App />
    </Provider>
    );
}

AppRegistry.registerComponent(appName, () => RNRedux);
*/


/*
// index.js

import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Root = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <App />
  </GestureHandlerRootView>
);

AppRegistry.registerComponent(appName, () => Root);

*/
