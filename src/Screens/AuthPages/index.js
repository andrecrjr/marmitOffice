import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Authenticated from './ProfileUser';
import { ListCommerces } from './CommercePages';
import StartScreenApp from '../StartIndex';
import HeaderDrawer from 'components/Header/customDraw';
import AnimatedTest from './AnimationPlace';

const UserStack = createDrawerNavigator();

const UserPages = () => {
  return (
    <UserStack.Navigator
      initialRouteName="Profile"
      drawerContent={(props) => <HeaderDrawer {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <UserStack.Screen name="Profile" component={Authenticated} />
      <UserStack.Screen name="Marmiteiros próximos" component={ListCommerces} />
      <UserStack.Screen name="teste animation" component={AnimatedTest} />
      <UserStack.Screen
        name="Logout"
        component={StartScreenApp}
        initialParams={{ logout: true }}
      />
    </UserStack.Navigator>
  );
};
export default UserPages;
