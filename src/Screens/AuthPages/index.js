import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Authenticated from './ProfileUser';
import { ListCommerces, CommerceSettings } from './CommercePages';
import StartScreenApp from '../StartIndex';
import HeaderDrawer from 'components/Header/customDraw';
//import AnimatedTest from './AnimationPlace';
import useGeolocation from 'components/hooks/useGeolocation';
import { GeoContext } from 'components/Contexts/LocationContext';

const UserStack = createDrawerNavigator();

const UserPages = () => {
  const geoloc = useGeolocation();
  return (
    <GeoContext.Provider value={geoloc}>
      <UserStack.Navigator
        initialRouteName="Profile"
        drawerContent={(props) => <HeaderDrawer {...props} />}
        screenOptions={{
          headerShown: false,
        }}>
        <UserStack.Screen name="Profile" component={Authenticated} />
        <UserStack.Screen
          name="Marmitoffices around"
          component={ListCommerces}
        />
        <UserStack.Screen name="Settings" component={CommerceSettings} />
        <UserStack.Screen
          name="Logout"
          component={StartScreenApp}
          initialParams={{ logout: true }}
        />
        {/* <UserStack.Screen name="teste animation" component={AnimatedTest} /> */}
      </UserStack.Navigator>
    </GeoContext.Provider>
  );
};
export default UserPages;
