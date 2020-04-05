import React, {useEffect} from 'react';
import {View, Text, Alert} from 'react-native';
import Layout from 'components/Layout';
import {useForm} from 'react-hook-form';
import FormInput from 'components/Input';
import ButtonView from 'components/Button';
import auth from '@react-native-firebase/auth';

const LoginPage = ({navigation}) => {
  const {register, handleSubmit, errors, setValue} = useForm();

  const signIn = async (data) => {
    try {
      const userData = await auth().signInWithEmailAndPassword(
        data.email,
        data.password,
      );
      console.log(userData);
      navigation.push('Authenticated');
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    register('email');
    register('password');
  }, [register]);

  const submitLogin = (data) => {
    console.log(data);
    signIn(data);
  };

  return (
    <Layout>
      <View>
        <Text>Login</Text>
        <FormInput
          nameInput={'email'}
          onChangeText={(text) => setValue('email', text)}
        />
        <FormInput
          nameInput={'password'}
          onChangeText={(text) => setValue('password', text)}
        />
        <ButtonView
          textStyle={{color: 'black'}}
          onPressFn={handleSubmit(submitLogin)}>
          Login
        </ButtonView>
      </View>
    </Layout>
  );
};

export default LoginPage;
