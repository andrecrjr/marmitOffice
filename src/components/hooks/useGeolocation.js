import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, PermissionsAndroid, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export default function useGeolocation() {
  const [geoloc, setGeolocation] = useState([0, 0]);

  async function grantGeolocation() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        updatePosition();
      } else {
        return false;
      }
    } catch (e) {
      Alert.alert('Geolocation not found');
    }
  }

  function geo_success(info) {
    const { latitude, longitude } = info.coords;
    setGeolocation([latitude, longitude]);
  }

  function geo_error(info) {
    console.log(info);
  }

  const updatePosition = () => {
    Geolocation.watchPosition((pos) => geo_success(pos), geo_error, {
      enableHighAccuracy: true,
      timeout: 30000,
      maximumAge: 1000,
    });
  };
  /*
  const refreshLocation = useCallback(async () => {
    grantGeolocation();
    console.log(geoloc);
  }, [geoloc, grantGeolocation]);
*/
  return { geoloc, grantGeolocation };
}
