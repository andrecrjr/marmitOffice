import React, { useState, useEffect, useCallback } from 'react';
import Layout from 'components/Layout';
import { View, Text, PermissionsAndroid, Alert, Button } from 'react-native';
import {
  GeoCollectionReference,
  GeoFirestore,
  GeoQuery,
  GeoQuerySnapshot,
} from 'geofirestore';
import firestore from '@react-native-firebase/firestore';
import Geolocation from '@react-native-community/geolocation';

const geofirestore = new GeoFirestore(firestore());
const isHermes = () => global.HermesInternal !== null;

const ListCommerces = () => {
  let watchPos;

  console.log(isHermes());
  const [rest, setRestaurants] = useState([]);
  const [geoloc, setGeolocation] = useState([]);
  const [errors, setError] = useState([]);

  function geo_success(info) {
    const { latitude, longitude } = info.coords;
    setGeolocation([latitude, longitude]);
  }

  function geo_error(info) {
    console.log(info);
  }
  const createMarmiteiro = (data) => {
    try {
      const geocollection = geofirestore.collection('marmiteiros');
      geocollection
        .add({
          restaurante: 'recreio shopping burguer king',
          cpf: 6666666,
          cnpj: 899998777,
          coordinates: new firestore.GeoPoint(-23.0195, -43.4869),
        })
        .then(() => {
          console.log('marmiteiro added!');
        });
    } catch (e) {
      console.log(e);
    }
  };

  const editMarmiteiro = async () => {
    const users = await firestore()
      .collection('marmiteiros')
      .doc('Id7xNVEdxSLgsK8KwofK');
    const user = await users.update({
      'd.restaurante': 'dona bente do recreio',
    });
    console.log(user);
  };

  async function grantGeolocation() {
    try {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted) return true;
    } catch (e) {
      console.log(e);
    }
  }
  const listLocations = useCallback(() => {
    async function listNearbyLocations() {
      try {
        console.log('clicou no location', geoloc);

        if (geoloc.length > 0) {
          // Create a GeoCollection reference
          const geocollection = geofirestore.collection('marmiteiros');

          // Create a GeoQuery based on a location
          const query = geocollection.near({
            center: new firestore.GeoPoint(geoloc[0], geoloc[1]),
            radius: 0.5,
          });
          const restaurants = await query.get();
          if (restaurants.docs.length > 0) {
            console.log(restaurants.docs);
            setRestaurants(
              restaurants.docs.map((location) => {
                return {
                  ...location.data(),
                  ...{ distance: location.distance, id: location.id },
                };
              }),
            );
            setError([]);
          } else {
            setRestaurants([]);

            setError({ description: 'No restaurants found', status: 1 });
          }
        }
      } catch (error) {
        console.log(error);
        setError({
          description: 'No latitude or longitude informed',
          status: 2,
        });
      }
    }
    listNearbyLocations();
  }, [geoloc]);

  const updatePosition = () => {
    Geolocation.getCurrentPosition(geo_success, geo_error, {
      enableHighAccuracy: true,
      timeout: 100000,
      maximumAge: 1000,
    });
    listLocations();

    watchPos = Geolocation.watchPosition((pos) => geo_success(pos));
  };

  useEffect(() => {
    if (grantGeolocation()) {
      updatePosition();
    } else {
      Alert('Permission not granted to our APP');
    }
    () => {
      Geolocation.clearWatch(watchPos);
    };
  }, [watchPos]);

  return (
    <Layout>
      {errors ? <Text>{errors.description}</Text> : null}
      <Text>Location here {geoloc}</Text>

      {rest.length > 0 ? <Text>Restaurants OK </Text> : <Text>Loading...</Text>}
      <Button onPress={() => listNearbyLocations()} title={'Update'} />
    </Layout>
  );
};

export default ListCommerces;
