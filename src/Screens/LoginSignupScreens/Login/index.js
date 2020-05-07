import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Title } from '../style';
import Layout from 'components/Layout';
import { useForm } from 'react-hook-form';
import FormInput, { ErrorForm } from 'components/Input';
import { TextCenter, AlertBox, AlertItem } from 'components/Text';
import ButtonView from 'components/Button';
import auth from '@react-native-firebase/auth';

const LoginPage = ({ navigation }) => {
  const { register, handleSubmit, errors, setValue } = useForm();
  const [errorSubmit, setError] = useState('');

  useEffect(() => {
    register('email', {
      required: true,
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: 'Endereço de email invalido',
      },
    });
    register('password');
  }, [register, errors]);

  const submitLogin = (data) => {
    if (Object.keys(errors).length === 0) {
      signIn(data);
    }
  };

  const signIn = async (data) => {
    try {
      console.log(data);
      await auth().signInWithEmailAndPassword(data.email, data.password);
      navigation.navigate('User');
    } catch (error) {
      setError('Problema na validação, senha ou e-mail incorretos!');
      console.log(error);
    }
  };

  return (
    <Layout>
      <View>
        <Title>Login</Title>
        {errorSubmit !== '' ? (
          <>
            <AlertBox>
              <AlertItem nameIcon={`error`} iconSize={35} color={`red`}>
                <TextCenter style={{ fontSize: 16 }}>{errorSubmit}</TextCenter>
              </AlertItem>
            </AlertBox>
          </>
        ) : null}
        <FormInput
          nameInput={'email@email.com'}
          error={errors ? errors.email : null}
          onChangeText={(text) => setValue('email', text)}
        />
        <FormInput
          nameInput={'***************'}
          onChangeText={(text) => setValue('password', text)}
        />
      </View>
      <ButtonView
        styles={{ marginTop: 35 }}
        onPressFn={handleSubmit(submitLogin)}>
        Login
      </ButtonView>
    </Layout>
  );
};

export default LoginPage;
