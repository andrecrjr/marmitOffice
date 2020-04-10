import React, { useState, useEffect } from 'react';
import Layout from 'components/Layout';
import { View, Text } from 'react-native';
import {
  GeoCollectionReference,
  GeoFirestore,
  GeoQuery,
  GeoQuerySnapshot,
} from 'geofirestore';
import firestore from '@react-native-firebase/firestore';

const geofirestore = new GeoFirestore(firestore());

const CommercePlaces = () => {
  const [rest, setRestaurants] = useState([]);
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
    const users = await firestore().collection('marmiteiros').doc(rest[0]);
    const user = await users.update({ 'd.restaurante': 'brejo fundo' });
  };

  const listNearbyLocations = async () => {
    try {
      // Create a GeoCollection reference
      const geocollection = geofirestore.collection('marmiteiros');

      // Create a GeoQuery based on a location
      const query = geocollection.near({
        center: new firestore.GeoPoint(-23.0239331, -43.4817407),
        radius: 2,
      });
      const restaurants = await query.get();
      console.log(restaurants.docs);
      setRestaurants(
        restaurants.docs.map((location) => {
          return { ...location.data(), ...{ distance: location.distance } };
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    //createMarmiteiro();
    listNearbyLocations();
  }, []);

  return (
    <Layout>
      <Text>Location here</Text>
    </Layout>
  );
};

export default CommercePlaces;

const PlaceCommerce = () => {
  return (
    <View>
      <Text>{}</Text>
    </View>
  );
};
