import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Title } from './style';
import Layout from 'components/Layout';
import { useForm } from 'react-hook-form';
import FormInput from 'components/Input';
import ButtonView from 'components/Button';
import auth from '@react-native-firebase/auth';

const LoginPage = ({ navigation }) => {
  const { register, handleSubmit, errors, setValue } = useForm();

  const signIn = async (data) => {
    try {
      await auth().signInWithEmailAndPassword(data.email, data.password);
      navigation.navigate('User');
    } catch (error) {
      console.log(error);
    }
  };

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
    console.log('bateu qui');
    if (Object.keys(errors).length === 0) {
      signIn(data);
    }
  };

  return (
    <Layout>
      <View>
        <Title>Login</Title>
        <FormInput
          descriptionInput={'Digite seu e-mail de usuário:'}
          nameInput={'email'}
          error={errors ? errors.email : null}
          onChangeText={(text) => setValue('email', text)}
        />
        <FormInput
          descriptionInput={'Digite sua senha:'}
          nameInput={'password'}
          onChangeText={(text) => setValue('password', text)}
        />
      </View>
      <ButtonView
        textStyle={{ color: 'white' }}
        onPressFn={handleSubmit(submitLogin)}>
        Login
      </ButtonView>
    </Layout>
  );
};

export default LoginPage;
