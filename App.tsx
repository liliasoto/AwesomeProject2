import React, { useEffect } from 'react';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home';
import Start from './components/Start';
import SignUp from './components/SignUp';
import CambiarCuenta from './components/CambiarCuenta';
import DatosPer from './components/DatosPer';
import IngresarDatos from './components/IngresarDatos';
import Contactos from './components/Contactos';
import Mensaje from './components/Mensaje';
import Alarmas from './components/Alarmas';
import EstadoDeSalud from './components/EstadoDeSalud';
import Historial from './components/Historial';
import Yo from './components/Yo';
import { UserProvider } from './components/UserContext'; 
import PushNotification from "react-native-push-notification";

type Contacto = {
  id: string;
  nombre: string;
  correo: string;
  estado: string;
};

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Start: undefined;
  SignUp: undefined;
  CambiarCuenta: undefined;
  DatosPer: { usuario: string; correo: string; contraseña: string };
  IngresarDatos: undefined;
  Contactos: undefined;
  Mensaje: { contacto: Contacto };
  Alarmas: undefined;
  EstadoDeSalud: undefined;
  Historial: undefined;
  Yo: undefined;
}

export type StackNavigation = NavigationProp<RootStackParamList>;
const Stack = createStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {

  /*
  useEffect(() => {
    const foregroundSubscriber = messaging().onMessage(
      async (remoteMessage) => {
        console.log('Push notification received', remoteMessage);
      }
    );
  
    messaging().subscribeToTopic('lilia_soto').then(() => console.log('Subscribed to topic lilia soto'));
  
    messaging().setBackgroundMessageHandler(
      async (remoteMessage) => {
        console.log('Push notification in background', remoteMessage);
      }
    );
  
    return () => {
      foregroundSubscriber();
    };
  }, []);
  */

  /*
  useEffect(() => {
    // Crear el canal de notificaciones si no existe
    PushNotification.createChannel(
      {
        channelId: "default-channel-id", // ID único para el canal
        channelName: "Default channel", // Nombre del canal
        channelDescription: "A default channel for notifications", // Descripción del canal
        playSound: true,
        soundName: "default",
        importance: Importance.HIGH,
        vibrate: true,
      },
      (created) => {
        if (created) {
          console.log("Canal de notificaciones creado");
        } else {
          console.log("El canal ya existe o hubo un error al crear el canal");
        }
      }
    );
  
    // Configurar las notificaciones
    PushNotification.configure({
      onRegister: function (token) {
        console.log("TOKEN:", token);
      },
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  
    // Configurar el manejador de mensajes en primer plano
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Notificación recibida en primer plano', remoteMessage);
      PushNotification.localNotification({
        channelId: "default-channel-id",
        title: remoteMessage.notification?.title,
        message: remoteMessage.notification?.body || '',
        playSound: true,
        soundName: 'default',
        importance: 'high',
        vibrate: true,
      });
    });
  
    // Suscribirse al tema
    messaging().subscribeToTopic('lilia_soto')
      .then(() => console.log('Suscrito al tema lilia_soto'));
  
    // Configurar el manejador de mensajes en segundo plano
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Notificación recibida en segundo plano', remoteMessage);
    });
  
    // Limpiar el suscriptor cuando el componente se desmonte
    return unsubscribe;
  }, []);
  */

  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Start'>
          <Stack.Screen 
            name="Start" 
            component={Start}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen 
            name="Home" 
            component={Home} 
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CambiarCuenta"
            component={CambiarCuenta}
          />
          <Stack.Screen
            name="DatosPer"
            component={DatosPer}
            options={{
              title: ""
            }}
          />
          <Stack.Screen
            name="IngresarDatos"
            component={IngresarDatos}
            options={{
              title: "Ingrese sus datos"
            }}
          />
          <Stack.Screen
            name="Contactos"
            component={Contactos}
          />
          <Stack.Screen
            name="Mensaje"
            component={Mensaje}
            options={{
              title: ""
            }}
          />
          <Stack.Screen
            name="Alarmas"
            component={Alarmas}
            options={{
              title: ""
            }}
          />
          <Stack.Screen
            name="EstadoDeSalud"
            component={EstadoDeSalud}
            options={{
              title: ""
            }}
          />
          <Stack.Screen
            name="Historial"
            component={Historial}
          />
          <Stack.Screen
            name="Yo"
            component={Yo}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

export default App;


