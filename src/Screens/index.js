import React, { useContext } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useAuthFirebase } from 'components/hooks/useAuth';
import Login from './LoginSignupPages/Login';
import Signup from './LoginSignupPages/Signup';
import UserPages from './AuthPages';
import { useGeolocation } from 'components/hooks/useGeolocation';

import StartScreenApp from './StartIndex';

const AuthStack = createStackNavigator();

export default function App() {
  const { authenticated } = useAuthFirebase();

  return (
    <NavigationContainer>
      <AuthStack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        {!authenticated ? (
          <>
            <AuthStack.Screen name="Home" component={StartScreenApp} />
            <AuthStack.Screen name="Login" component={Login} />
            <AuthStack.Screen name="Signup" component={Signup} />
          </>
        ) : (
          <>
            <AuthStack.Screen name="User" component={UserPages} />
          </>
        )}
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}
