import React from 'react';
import Layout from 'components/Layout';
import {View, Text} from 'react-native';
import {
  GeoCollectionReference,
  GeoFirestore,
  GeoQuery,
  GeoQuerySnapshot,
} from 'geofirestore';
import firestore from '@react-native-firebase/firestore';

const CommercePlaces = () => {
  const nearbyLocations = () => {
    try {
      // Create a Firestore reference

      // Create a GeoFirestore reference
      const geofirestore = new GeoFirestore(firestore());

      // Create a GeoCollection reference
      const geocollection = geofirestore.collection('marmiteiros');

      // Create a GeoQuery based on a location
      const query = geocollection.near({
        center: new firestore.GeoPoint(-23.0239331, -43.4817407),
        radius: 1000,
      });

      // Get query (as Promise)
      query.get().then((value) => {
        console.log(value);
        console.log(value.docs); // All docs returned by GeoQuery
      });
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    nearbyLocations();
  }, []);
  const fetchme = async () => {
    const users = await (
      await firestore().collection('marmiteiros').get()
    ).docs('location');
    console.log(users);
  };
  return (
    <Layout>
      <Text>Location here</Text>
    </Layout>
  );
};

export default CommercePlaces;
