import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import Layout from 'components/Layout';
import { useAuthFirebase } from 'components/hooks/useAuth';
import firestore from '@react-native-firebase/firestore';
import Geolocation from '@react-native-community/geolocation';
import {
  GeoCollectionReference,
  GeoFirestore,
  GeoQuery,
  GeoQuerySnapshot,
} from 'geofirestore';
import FormInput from 'components/Input';
import ButtonView from 'components/Button';
import { useForm } from 'react-hook-form';

import MapCommerce from './MapCommerce';

const geofirestore = new GeoFirestore(firestore());

const CommerceSettings = ({ hasMenu }) => {
  const { user, userData } = useAuthFirebase();
  const { register, handleSubmit, errors, setValue } = useForm();
  const [isNotFreelancer, setCheckFreelancer] = useState(false);
  const [firstPart, setFirstPartDone] = useState(true);
  const [userNewData, setNewUser] = useState([]);

  const createGeoCommerce = (data) => {
    try {
      const geocollection = geofirestore.collection('GeoCommerceData');
      geocollection
        .add({
          commerceName: data.displayName,
          cpf: data.cpf || null,
          cnpj: data.cnpj || null,
          coordinates: new firestore.GeoPoint(-23.0195, -43.4869),
        })
        .then(() => {
          console.log('Commerce added!');
        });
    } catch (e) {
      console.log(e);
    }
  };

  const confirmData = (data) => {
    const { errors } = data;
    if (!errors) {
      setNewUser(data);
      setFirstPartDone(true);
    }
  };

  useEffect(() => {
    register('displayName');
    register('cpf');
    register('cnpj');
  }, [register]);
  return (
    <Layout hasMenu={hasMenu}>
      {!firstPart ? (
        <>
          <FormInput
            styleWrap={{ paddingTop: 55 }}
            descriptionInput={'Digite o nome do seu comércio:'}
            nameInput={'Pensão da Tia Jujuba'}
            error={errors ? errors.password : null}
            onChangeText={(text) => setValue('displayName', text)}
          />
          <FormInput
            styleWrap={{ marginTop: 35 }}
            checkbox={true}
            isChecked={isNotFreelancer}
            onChange={() => {
              setCheckFreelancer(!isNotFreelancer);
            }}
            descriptionInput={'Você é Pessoa Jurídica e tem CNPJ?'}
          />
          {isNotFreelancer ? (
            <FormInput
              styleWrap={{ marginTop: 35, paddingBottom: 15 }}
              descriptionInput={'Digite seu CNPJ:'}
              nameInput={'Pensão da Tia Jujuba'}
              error={errors ? errors.cnpj : null}
              onChangeText={(text) => setValue('cnpj', text)}
            />
          ) : (
            <FormInput
              styleWrap={{ marginTop: 35, paddingBottom: 5 }}
              descriptionInput={'Digite seu CPF(sem pontos):'}
              nameInput={'1565489765'}
              error={errors ? errors.cpf : null}
              onChangeText={(text) => setValue('cpf', text)}
            />
          )}

          <ButtonView onPressFn={handleSubmit(confirmData)}>
            Próximo >
          </ButtonView>
        </>
      ) : (
        <MapCommerce />
      )}
    </Layout>
  );
};

export default CommerceSettings;
