import React, { useContext } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useAuthFirebase } from 'components/hooks/useAuth';
import Login from './LoginSignupPages/Login';
import Signup from './LoginSignupPages/Signup';
import UserPages from './AuthPages';
import { UserAuth } from 'components/Layout/UserContext';

import StartScreenApp from './StartIndex';

const AuthStack = createStackNavigator();

export default function App() {
  const { user, userData, authenticated } = useAuthFirebase();

  return (
    <UserAuth.Provider value={{ user, userData, authenticated }}>
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
    </UserAuth.Provider>
  );
}
