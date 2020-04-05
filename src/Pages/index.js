import StartScreenApp from './StartIndex';
import Login from './LoginSignupPages/Login';
import Signup from './LoginSignupPages/Signup';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Authenticated from './AuthPages/UserAuth';
import auth from '@react-native-firebase/auth';
import React, {useEffect, useState} from 'react';

const Stack = createStackNavigator();
export default function App() {
  const [authenticated, setAuth] = useState(false);
  const [user, setUser] = useState();

  const authState = (userData) => {
    setUser(userData);
    if (userData) {
      setAuth(true);
    }
  };
  useEffect(() => {
    const subscribedUser = auth().onAuthStateChanged(authState);
    return subscribedUser;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={StartScreenApp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Authenticated" component={Authenticated} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
