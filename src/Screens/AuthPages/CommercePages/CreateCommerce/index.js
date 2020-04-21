import React, { useEffect, useReducer } from 'react';
import { Alert } from 'react-native';
import Layout from 'components/Layout';
import { useAuthFirebase } from 'components/hooks/useAuth';
import firestore from '@react-native-firebase/firestore';
import { GeoFirestore } from 'geofirestore';
import FormInput from 'components/Input';
import ButtonView, { ButtonIcon } from 'components/Button';
import { useForm } from 'react-hook-form';
import AddPicture from './AddPicture';

import MapCommerce from './MapCommerce';

const geofirestore = new GeoFirestore(firestore());

const reducerForm = (state, action) => {
  switch (action.type) {
    case 'ADD_GEOLOCATION':
      return { ...state, geolocation: action.payload };
    case 'ADD_PHOTO':
      return { ...state, photo: { url_pic: action.payload } };
    case 'IS_FREELA':
      return { ...state, isFreela: action.payload };
    case 'FIRST_PART_DONE':
      return { ...state, firstPart: action.payload };
    default:
      return state;
  }
};

const initialState = {
  geolocation: {},
  photo: { url_pic: '' },
  isFreela: false,
  firstPart: false,
};

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
      dispatchForm({ type: 'FIRST_PART_DONE', payload: true });
    }
  };

  const testCreate = (data) => {
    console.log(data);
    console.log(dataForm);
  };

  useEffect(() => {
    register('displayName');
    register('cpf');
    register('cnpj');
    () => {};
  }, [register]);
  return (
    <Layout>
      {!dataForm.firstPart ? (
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
            isChecked={dataForm.isFreela}
            onChange={() => {
              dispatchForm({ type: 'IS_FREELA', payload: !dataForm.isFreela });
            }}
            descriptionInput={'Você é Pessoa Jurídica e tem CNPJ?'}
          />
          {dataForm.isFreela ? (
            <FormInput
              styleWrap={{ marginTop: 35, paddingBottom: 15 }}
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
          <AddPicture style={{ marginTop: 35 }} />
          <ButtonView
            onPressFn={handleSubmit(confirmData)}
            styles={{ marginTop: 25 }}>
            Próximo
          </ButtonView>
        </>
      ) : (
        <>
          <MapCommerce getLocation={dispatchForm} />
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
