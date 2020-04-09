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
  const [place, setPlaces] = React.useState([]);
  const mounted = React.useRef();
  const createMarmiteiro = (data) => {
    try {
      const geocollection = geofirestore.collection('marmiteiros');
      geocollection
        .add({
          restaurante: 'recreio shopping',
          cpf: 1215455641,
          cnpj: 1515465284,
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
    const user = await users.update({'d.restaurante': 'brejo fundo'});
  };
  const nearbyLocations = () => {
    try {
      // Create a GeoCollection reference
      const geocollection = geofirestore.collection('marmiteiros');

      // Create a GeoQuery based on a location
      const query = geocollection.near({
        center: new firestore.GeoPoint(-23.0239331, -43.4817407),
        radius: 2,
      });

      // Get query (as Promise)
      query.get().then((value) => {
        setRest(value.docs);
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
        setPlaces((prevState) => [...prevState, user.data()]);
      } catch (e) {
        console.warn(e);
      }
    };
    fetchuser();
  }, [rest]);

  React.useEffect(() => {
    //createMarmiteiro();

    nearbyLocations();
    //fetchUsers();
    console.log(rest);
    if (!mounted.current) {
      mounted.current = true;
    } else {
      // console.log(place);
    }
  }, [fetchUsers, rest]);

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
