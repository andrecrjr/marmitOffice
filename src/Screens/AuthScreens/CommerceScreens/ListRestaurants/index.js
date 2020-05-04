import React, { useState, useEffect, useContext } from 'react';
import Layout from 'components/Layout';
import { Text } from 'react-native';
import {
  GeoCollectionReference,
  GeoFirestore,
  GeoQuery,
  GeoQuerySnapshot,
} from 'geofirestore';
import firestore from '@react-native-firebase/firestore';
import { GeoContext } from 'components/Contexts/LocationContext';

const geofirestore = new GeoFirestore(firestore());
const isHermes = () => global.HermesInternal !== null;

const ListCommerces = () => {
  console.log(isHermes());
  const geoloc = useContext(GeoContext);
  const [places, setPlaces] = useState([]);
  const [errors, setError] = useState([]);

  const editMarmiteiro = async () => {
    const users = await firestore()
      .collection('marmiteiros')
      .doc('Id7xNVEdxSLgsK8KwofK');
    const user = await users.update({
      'd.restaurante': 'dona bente do recreio',
    });
    console.log(user);
  };

  async function listNearbyLocations(lat, lng, filterKm = 0.5) {
    try {
      if (lat && lng) {
        // Create a GeoCollection reference
        const geocollection = geofirestore.collection('marmiteiros');

        // Create a GeoQuery based on a location
        const query = geocollection.near({
          center: new firestore.GeoPoint(lat, lng),
          radius: filterKm,
        });
        const restaurants = await query.get();
        if (restaurants.docs.length > 0) {
          setPlaces(
            restaurants.docs.map((location) => {
              return {
                ...location.data(),
                ...{ distance: location.distance, id: location.id },
              };
            }),
          );
          setError([]);
        } else {
          setPlaces([]);

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
    listNearbyLocations(geoloc.latitude, geoloc.longitude);
  }, [geoloc]);

  return (
    <Layout>
      {errors ? <Text>{errors.description}</Text> : null}
      <Text>Location here {geoloc.latitude}</Text>

      {places.length > 0 ? (
        <Text>Restaurants OK </Text>
      ) : (
        <Text>Loading...</Text>
      )}
    </Layout>
  );
};

export default ListCommerces;
