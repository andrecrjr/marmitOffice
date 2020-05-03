import React, { useEffect, useState } from 'react';
import { View, Alert } from 'react-native';
import Layout from 'components/Layout';
import { Title } from '../style';
import FormInput, { ErrorInput } from 'components/Input';
import ButtonView from 'components/Button';
import { useForm } from 'react-hook-form';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Signup = () => {
  const { register, handleSubmit, errors, setValue } = useForm();
  const [checked, setCheck] = useState(false);
  const usersCollection = firestore().collection('Users');
  const addUser = async (data) => {
    try {
      const newUser = await auth().createUserWithEmailAndPassword(
        data.email,
        data.password,
      );
      if (newUser) {
        const user = await usersCollection.doc(newUser.user.uid).set({
          email: data.email,
          commerceUser: checked,
          id: newUser.user.uid,
          commerceCreated: false,
        });
        return user;
      }
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        errors.auth = 'That email address is already in use!';
      }

      if (error.code === 'auth/invalid-email') {
        errors.auth = 'That email address is invalid!';
      }
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
    register('password', {
      required: true,
    });
    register('displayName');

    return () => {};
  }, [register]);
  return (
    <Layout>
      <View>
        <Title> Cadastre-se </Title>
        {errors ? <ErrorInput>errors.auth</ErrorInput> : null} />
        <FormInput
          descriptionInput={'Digite seu nome e sobrenome:'}
          nameInput={'ex.:André Carlos'}
          error={errors ? errors.displayName : null}
          onChangeText={(text) => setValue('displayName', text)}
        />
        <FormInput
          descriptionInput={'Digite seu e-mail de usuário:'}
          nameInput={'ex.:andre@gmail.com'}
          error={errors ? errors.email : null}
          onChangeText={(text) => setValue('email', text)}
        />
        <FormInput
          descriptionInput={'Digite sua senha:'}
          nameInput={'password'}
          error={errors ? errors.password : null}
          onChangeText={(text) => setValue('password', text)}
        />
        <FormInput
          checkbox={true}
          isChecked={checked}
          onChange={() => {
            setCheck(!checked);
          }}
          descriptionInput={'Você é um estabelecimento/vendedor autônomo?'}
          nameInput={'estabelecimento'}
        />
      </View>
      <ButtonView
        textStyle={{ color: 'white' }}
        onPressFn={handleSubmit(addUser)}>
        Sign up!
      </ButtonView>
    </Layout>
  );
};

export default Signup;

//const styles = StyleSheet.create({});
