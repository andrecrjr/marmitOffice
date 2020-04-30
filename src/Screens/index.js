import React, { useContext } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useAuthFirebase } from 'components/hooks/useAuth';
import Login from './LoginSignupScreens/Login';
import Signup from './LoginSignupScreens/Signup';
import UserPages from './AuthScreens';

import StartScreenApp from './StartScreen';

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
