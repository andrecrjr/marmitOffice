import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import Layout from 'components/Layout';
import { useAuthFirebase } from 'components/hooks/useAuth';
import firestore from '@react-native-firebase/firestore';
import { GeoFirestore } from 'geofirestore';
import FormInput from 'components/Input';
import ButtonView, { ButtonIcon } from 'components/Button';
import { useForm } from 'react-hook-form';

import MapCommerce from './MapCommerce';

const geofirestore = new GeoFirestore(firestore());

const CommerceSettings = ({ navigation }) => {
  const { user } = useAuthFirebase();
  const { register, handleSubmit, setValue, errors } = useForm();
  const [isNotFreela, setCheckFreela] = useState(false);
  const [location, setLocation] = useState({});
  const [firstPart, setFirstPartDone] = useState(false);

  const createGeoCommerce = (data) => {
    try {
      const geocollection = geofirestore.collection('GeoCommerceData');
      geocollection
        .add({
          commerceName: data.displayName,
          cpf: data.cpf || null,
          cnpj: data.cnpj || null,
          uid: user.uid,
          coordinates: new firestore.GeoPoint(
            location.latitude,
            location.longitude,
          ),
        })
        .then(() => {
          Alert.alert(
            'Pronto! Seu comércio foi cadastrado com sucesso no local na qual marcou!',
          );
          //navigation.navigate('FoodMenuToday');
          console.log('Commerce added!');
        });
    } catch (e) {
      console.log(e);
    }
  };

  const confirmData = (data) => {
    const { errors } = data;
    if (!errors) {
      //setNewUser(data);
      setFirstPartDone(true);
    }
  };

  const testCreate = (data) => {
    console.log(data);
    console.log(location);
  };

  useEffect(() => {
    register('displayName');
    register('cpf');
    register('cnpj');
    () => {};
  }, [register]);
  return (
    <Layout>
      {!firstPart ? (
        <>
          <FormInput
            styleWrap={{ paddingTop: 55 }}
            iconName="assignment-ind"
            descriptionInput={'Digite o nome do seu comércio:'}
            nameInput={'Pensão da Tia Jujuba'}
            error={errors ? errors.password : null}
            onChangeText={(text) => setValue('displayName', text)}
          />
          <FormInput
            styleWrap={{ marginTop: 35 }}
            checkbox={true}
            isChecked={isNotFreela}
            onChange={() => {
              setCheckFreela(!isNotFreela);
            }}
            descriptionInput={'Você é Pessoa Jurídica e tem CNPJ?'}
          />
          {isNotFreela ? (
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

          <ButtonView onPressFn={handleSubmit(confirmData)}>Próximo</ButtonView>
        </>
      ) : (
        <>
          <MapCommerce getLocation={setLocation} />
          <ButtonIcon
            nameIcon={'done'}
            style={{
              width: 80,
              height: 80,
              backgroundColor: 'red',
              position: 'absolute',
              alignSelf: 'center',
              bottom: 20,
              borderRadius: 100,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={handleSubmit(testCreate)}
            size={55}
            color={'white'}
          />
        </>
      )}
    </Layout>
  );
};

export default CommerceSettings;
