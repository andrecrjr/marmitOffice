import React, { useEffect, useReducer } from 'react';
import { Alert, Text, Dimensions, ScrollView } from 'react-native';
import Layout from 'components/Layout';
import firestore from '@react-native-firebase/firestore';
import { GeoFirestore } from 'geofirestore';
import FormInput from 'components/Input';
import ButtonView from 'components/Button';
import { useForm } from 'react-hook-form';
import AddPicture from './AddPicture';
import { reducerForm, initialState } from './reducerForm';

import MapCommerce from './MapCommerce';

const geofirestore = new GeoFirestore(firestore());

const CommerceSettings = ({ user }) => {
  const { register, handleSubmit, setValue, errors } = useForm();

  const [dataForm, dispatchForm] = useReducer(reducerForm, initialState);

  const createGeoCommerce = async (data) => {
    try {
      const geocollection = geofirestore.collection('GeoCommerceData');
      //const picCommerce = await
      const created = await geocollection.add({
        commerceName: data.displayName,
        cpf: data.cpf || null,
        cnpj: data.cnpj || null,
        uid: user.uid,
        coordinates: new firestore.GeoPoint(
          dataForm.geolocation.latitude,
          dataForm.geolocation.longitude,
        ),
      });

      if (created) {
        console.log('Commerce added!');

        Alert.alert(
          'Pronto! Seu comércio foi cadastrado com sucesso no local na qual marcou!',
        );
      }
      //navigation.navigate('FoodMenuToday');
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

  useEffect(() => {
    register('displayName');
    register('cpf');
    register('cnpj');
    console.log(Dimensions.get('window').width / 1.4);
  }, [register]);

  return (
    <Layout>
      {!dataForm.firstPart ? (
        <ScrollView>
          <FormInput
            styleWrap={{ paddingTop: 45 }}
            iconName="assignment-ind"
            descriptionInput={'Qual o nome do seu comércio?'}
            nameInput={'ex.:Pensão da Tia Jujuba'}
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
              descriptionInput={'Qual seu CNPJ?'}
              nameInput={'56544878565'}
              error={errors ? errors.cnpj : null}
              onChangeText={(text) => setValue('cnpj', text)}
            />
          ) : (
            <FormInput
              styleWrap={{ marginTop: 35 }}
              descriptionInput={'Qual seu CPF?'}
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
        </ScrollView>
      ) : (
        <>
          <MapCommerce getLocation={dispatchForm} data={dataForm} />
        </>
      )}
    </Layout>
  );
};

export default CommerceSettings;
