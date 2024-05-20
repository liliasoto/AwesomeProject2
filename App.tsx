import React from 'react';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login';
import Home from './components/Home';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
}

export type StackNavigation = NavigationProp<RootStackParamList>;
const Stack = createStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen 
          name="Login" 
          component={Login}
          options={{
            headerShown: false,
            headerStyle: {backgroundColor:'#ffff00'},
          }}
        />
        <Stack.Screen 
          name="Home" 
          component={Home} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


