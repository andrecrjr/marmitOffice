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
    const users = await firestore()
      .collection('marmiteiros')
      .doc('Id7xNVEdxSLgsK8KwofK');
    const user = await users.update({
      'd.restaurante': 'dona bente do recreio',
    });
    console.log(user);
  };

  const callNearby = React.useCallback(() => {
    const listNearbyLocations = async () => {
      try {
        // Create a GeoCollection reference
        const geocollection = geofirestore.collection('marmiteiros');

        // Create a GeoQuery based on a location
        const query = geocollection.near({
          center: new firestore.GeoPoint(-23.0239331, -43.4817407),
          radius: 0.8,
        });
        const restaurants = await query.get();
        setRestaurants(
          restaurants.docs.map((location) => {
            return {
              ...location.data(),
              ...{ distance: location.distance, id: location.id },
            };
          }),
        );
      } catch (error) {
        console.log(error);
      }
    };
    listNearbyLocations();
  }, []);

  useEffect(() => {
    //editMarmiteiro();
    callNearby();
  }, [callNearby]);

  useEffect(() => {
    console.log(rest);
  }, [rest]);

  return (
    <Layout>
      <Text>Location here</Text>
      {rest.length > 0 ? (
        <Text>Restaurantes carregados</Text>
      ) : (
        <Text> Loading... </Text>
      )}
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
