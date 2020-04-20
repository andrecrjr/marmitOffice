import React, { useState, useEffect } from 'react';
import { PermissionsAndroid, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export default function useGeolocation() {
  const [geoloc, setGeolocation] = useState({ latitude: 0, longitude: 0 });
  let watchId;

  async function grantGeolocation() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        updatePosition();
        console.log(geoloc);
      } else {
        Alert.alert('Your GPS was not being used');
      }
    } catch (e) {
      Alert.alert('Geolocation not found');
    }
  }

  function geo_success(event) {
    const { latitude, longitude } = event.coords;
    setGeolocation({ latitude: latitude, longitude: longitude });
  }

  function geo_error(info) {
    console.log(info);
  }

  const updatePosition = () => {
    watchId = Geolocation.watchPosition((pos) => geo_success(pos), geo_error, {
      enableHighAccuracy: true,
      timeout: 2000,
      maximumAge: 1000,
    });
  };

  useEffect(() => {
    grantGeolocation();
    () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  return geoloc;
}
