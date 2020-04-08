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

const geofirestore = new GeoFirestore(firestore());

const CommercePlaces = () => {
  const [rest, setRest] = React.useState([]);
  const createMarmiteiro = () => {
    try {
      const geocollection = geofirestore.collection('marmiteiros');
      geocollection
        .add({
          restaurante: 'recreio manoel',
          coordinates: new firestore.GeoPoint(-23.0239331, -43.4817407),
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
    const user = await users.update({'d.restaurante': 'brejo fundo'});
    console.log(user);
  };
  const nearbyLocations = () => {
    try {
      // Create a GeoCollection reference
      const geocollection = geofirestore.collection('marmiteiros');

      // Create a GeoQuery based on a location
      const query = geocollection.near({
        center: new firestore.GeoPoint(-23.0239331, -43.4817407),
        radius: 1000,
      });

      // Get query (as Promise)
      query.get().then((value) => {
        setRest(value.docs.map(({id}) => id));
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = React.useCallback(() => {
    const fetchuser = async () => {
      try {
        const users = await firestore().collection('marmiteiros').doc(rest[0]);
        const user = await users.get();
        console.log(user.data());
      } catch (e) {
        console.warn(e);
      }
    };
    fetchuser();
  }, [rest]);

  React.useEffect(() => {
    nearbyLocations();
    //editMarmiteiro();
    fetchUsers();
    () => console.log('done');
  }, [fetchUsers, rest]);

  return (
    <Layout>
      <Text>Location here</Text>
    </Layout>
  );
};

export default CommercePlaces;
