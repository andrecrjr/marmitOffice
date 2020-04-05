import StartScreenApp from './StartIndex';
import React from 'react';
import Login from './LoginSignupPages/Login';
import Signup from './LoginSignupPages/Signup';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Authenticated from './AuthPages/UserAuth';
import {useAuthFirebase} from 'components/hooks/useAuth';

const AuthStack = createStackNavigator();
const UserStack = createDrawerNavigator();

export default function App() {
  const {authenticated} = useAuthFirebase();
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

const UserPages = () => {
  return (
    <UserStack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
      }}>
      <UserStack.Screen name="Profile" component={Authenticated} />
    </UserStack.Navigator>
  );
};
