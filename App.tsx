import React from 'react';
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


