import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Authenticated from './ProfileUser';
import StartScreenApp from '../StartScreen';
import { ListCommerces } from './CommercePages/';
import Settings from './Settings';
import useGeolocation from 'components/hooks/useGeolocation';
import { useAuthFirebase } from 'components/hooks/useAuth';
import { GeoContext } from 'components/Contexts/LocationContext';
import { UserAuth } from 'components/Contexts/UserContext';

import NearIcon from 'components/Button/NearIcon';
import Icon from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont();

const UserStack = createBottomTabNavigator();

const SystemStack = createStackNavigator();

const UserPages = ({ navigation }) => {
  const { user, userData, authenticated } = useAuthFirebase();
  const geoloc = useGeolocation();
  return (
    <UserAuth.Provider value={{ user, userData, authenticated }}>
      <GeoContext.Provider value={geoloc}>
        <UserStack.Navigator
          initialRouteName="Profile"
          tabBarOptions={{
            activeTintColor: '#e3e3e3',
            labelStyle: { fontSize: 12 },
            inactiveTintColor: 'white',
            style: {
              backgroundColor: 'red',
              height: 58,
            },
          }}
          screenOptions={{
            headerShown: false,
          }}>
          <UserStack.Screen
            name="SystemSettings"
            options={{
              tabBarLabel: 'Settings',
              tabBarIcon: (props) => (
                <Icon name="settings" color={props.color} size={25} />
              ),
            }}
            initialParams={{ user: userData ? userData : 'nope' }}
            component={SystemTabs}
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
            name="Profile"
            component={Authenticated}
            options={{
              tabBarIcon: (props) => (
                <Icon name="account-circle" size={25} color={props.color} />
              ),
            }}
          />

          {/* <UserStack.Screen name="teste animation" component={AnimatedTest} /> */}
        </UserStack.Navigator>
      </GeoContext.Provider>
    </UserAuth.Provider>
  );
};

const SystemTabs = () => (
  <SystemStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <SystemStack.Screen
      name="Settings"
      component={Settings}
      initialParams={{ firstTime: false }}
    />
    <SystemStack.Screen
      name="Logout"
      options={{
        tabBarVisible: false,
      }}
      component={StartScreenApp}
      initialParams={{ logout: true }}
    />
  </SystemStack.Navigator>
);

export default UserPages;
