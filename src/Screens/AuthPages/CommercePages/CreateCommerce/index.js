import React, { useEffect, useReducer } from 'react';
import { Alert, Text, Dimensions } from 'react-native';
import Layout from 'components/Layout';
import { useAuthFirebase } from 'components/hooks/useAuth';
import firestore from '@react-native-firebase/firestore';
import { GeoFirestore } from 'geofirestore';
import FormInput from 'components/Input';
import ButtonView, { ButtonIcon } from 'components/Button';
import { useForm } from 'react-hook-form';
import AddPicture from './AddPicture';
import { reducerForm, initialState } from './reducerForm';

import MapCommerce from './MapCommerce';

const geofirestore = new GeoFirestore(firestore());

const CommerceSettings = ({ navigation }) => {
  const { user } = useAuthFirebase();
  const { register, handleSubmit, setValue, errors } = useForm();
  const [dataForm, dispatchForm] = useReducer(reducerForm, initialState);

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
            dataForm.geolocation.latitude,
            dataForm.geolocation.longitude,
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
      dispatchForm({ type: 'FIRST_STEP_CONTROL', payload: true });
    }
  };

  const testCreate = (data) => {
    console.log(Dimensions.get('window').width / 1.5);
  };

  useEffect(() => {
    register('displayName');
    register('cpf');
    register('cnpj');
    console.log(Dimensions.get('window').width / 1.4);
  }, [register]);

  return (
    <Layout>
      {!dataForm.firstPart ? (
        <>
          <FormInput
            styleWrap={{ paddingTop: 45 }}
            iconName="assignment-ind"
            descriptionInput={'Digite o nome do seu comércio:'}
            nameInput={'Pensão da Tia Jujuba'}
            error={errors ? errors.password : null}
            onChangeText={(text) => setValue('displayName', text)}
          />
          <FormInput
            styleWrap={{ marginTop: 35 }}
            checkbox={true}
            isChecked={dataForm.isFreela}
            onChange={() => {
              dispatchForm({ type: 'IS_FREELA', payload: !dataForm.isFreela });
            }}
            descriptionInput={'Você é Pessoa Jurídica e tem CNPJ?'}
          />
          {dataForm.isFreela ? (
            <FormInput
              styleWrap={{ marginTop: 35 }}
              descriptionInput={'Digite seu CNPJ:'}
              nameInput={'Pensão da Tia Jujuba'}
              error={errors ? errors.cnpj : null}
              onChangeText={(text) => setValue('cnpj', text)}
            />
          ) : (
            <FormInput
              styleWrap={{ marginTop: 35 }}
              descriptionInput={'Digite seu CPF(sem pontos):'}
              nameInput={'1565489765'}
              error={errors ? errors.cpf : null}
              onChangeText={(text) => setValue('cpf', text)}
            />
          )}
          <AddPicture
            style={{ marginTop: 35 }}
            getImageData={dispatchForm}
            data={dataForm}
          />
          {!dataForm.geolocation.changed ? (
            <ButtonView
              onPressFn={handleSubmit(confirmData)}
              styles={{ marginTop: 25 }}>
              Próximo
            </ButtonView>
          ) : (
            <Text>Local de venda marcado com sucesso!</Text>
          )}
        </>
      ) : (
        <>
          <MapCommerce getLocation={dispatchForm} data={dataForm} />
        </>
      )}
    </Layout>
  );
};

export default CommerceSettings;
