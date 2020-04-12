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
async function useListLocations() {
  const [geoloc, setGeolocation] = useState([]);
  const [errors, setError] = useState([]);
  const [rest, setRestaurants] = useState([]);

  try {
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
