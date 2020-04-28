import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Authenticated from './ProfileUser';
import { ListCommerces, CommerceSettings } from './CommercePages';
import StartScreenApp from '../StartIndex';
//import HeaderDrawer from 'components/Header/customDraw';
//import AnimatedTest from './AnimationPlace';
import useGeolocation from 'components/hooks/useGeolocation';
import { GeoContext } from 'components/Contexts/LocationContext';
import NearIcon from 'components/Button/NearIcon';
import Icon from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont();
const UserStack = createBottomTabNavigator();

const UserPages = () => {
  const geoloc = useGeolocation();
  return (
    <GeoContext.Provider value={geoloc}>
      <UserStack.Navigator
        initialRouteName="Profile"
        tabBarOptions={{
          activeTintColor: '#e3e3e3',
          labelStyle: { fontSize: 12 },
          inactiveTintColor: 'white',
          style: {
            backgroundColor: 'red',
            height: 64,
          },
        }}
        screenOptions={{
          headerShown: false,
        }}>
        <UserStack.Screen
          name="Settings"
          options={{
            tabBarIcon: (props) => (
              <Icon name="settings" color={props.color} size={35} />
            ),
          }}
          component={CommerceSettings}
        />

        <UserStack.Screen
          name="FindMe"
          component={ListCommerces}
          options={{
            tabBarLabel: '',
            tabBarIcon: (props) => (
              <NearIcon
                {...props}
                name={'restaurant-menu'}
                title={'Procurar'}
                size={45}
              />
            ),
          }}
        />
        <UserStack.Screen
          name="Perfil"
          component={Authenticated}
          options={{
            tabBarIcon: (props) => (
              <Icon name="account-circle" size={35} color={props.color} />
            ),
          }}
        />

        {/* <UserStack.Screen
          name="Logout"
          component={StartScreenApp}
          initialParams={{ logout: true }}
        /> */}
        {/* <UserStack.Screen name="teste animation" component={AnimatedTest} /> */}
      </UserStack.Navigator>
    </GeoContext.Provider>
  );
};
export default UserPages;
