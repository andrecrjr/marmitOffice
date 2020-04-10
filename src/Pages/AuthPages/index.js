import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Authenticated from './UserAuth';
import CommercePlaces from './CommercePlaces';
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
      <UserStack.Screen
        name="Marmiteiros próximos"
        component={CommercePlaces}
      />
      <UserStack.Screen name="teste animation" component={AnimatedTest} />
      <UserStack.Screen
        name="Logout"
        component={StartScreenApp}
        initialParams={{logout: true}}
      />
    </UserStack.Navigator>
  );
};
export default UserPages;
