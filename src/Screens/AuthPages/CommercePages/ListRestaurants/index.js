import React, { useState, useEffect, useCallback } from 'react';
import Layout from 'components/Layout';
import { View, Text, Alert, Button } from 'react-native';
import {
  GeoCollectionReference,
  GeoFirestore,
  GeoQuery,
  GeoQuerySnapshot,
} from 'geofirestore';
import firestore from '@react-native-firebase/firestore';
import useGeolocation from 'components/hooks/useGeolocation';

const geofirestore = new GeoFirestore(firestore());
const isHermes = () => global.HermesInternal !== null;

const ListCommerces = () => {
  console.log(isHermes());
  const [rest, setRestaurants] = useState([]);
  const [errors, setError] = useState([]);
  const { geoloc, refreshLocation } = useGeolocation();

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

  async function listNearbyLocations(lat, lng) {
    try {
      console.log('clicou no location', lat, lng);

      if (lat && lng) {
        // Create a GeoCollection reference
        const geocollection = geofirestore.collection('marmiteiros');

        // Create a GeoQuery based on a location
        const query = geocollection.near({
          center: new firestore.GeoPoint(lat, lng),
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

  useEffect(() => {
    refreshLocation();
    if (geoloc) {
      console.log(geoloc);
      listNearbyLocations(geoloc[0], geoloc[1]);
    }
  }, [geoloc, grantGeolocation]);

  return (
    <Layout>
      {errors ? <Text>{errors.description}</Text> : null}
      <Text>Location here {geoloc}</Text>

      {rest.length > 0 ? <Text>Restaurants OK </Text> : <Text>Loading...</Text>}
    </Layout>
  );
};

export default ListCommerces;
