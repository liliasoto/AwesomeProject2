import React from 'react';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home';
import Start from './components/Start';
import SignUp from './components/SignUp';
import CambiarCuenta from './components/CambiarCuenta';
import DatosPer from './components/DatosPer';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Start: undefined;
  SignUp: undefined;
  CambiarCuenta: undefined;
  DatosPer: undefined;
}

export type StackNavigation = NavigationProp<RootStackParamList>;
const Stack = createStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {

  return (
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
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
        />
        <Stack.Screen
          name="CambiarCuenta"
          component={CambiarCuenta}
        />
        <Stack.Screen
          name="DatosPer"
          component={DatosPer}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


