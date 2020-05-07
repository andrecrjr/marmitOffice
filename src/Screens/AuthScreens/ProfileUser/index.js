import React, { useEffect } from 'react';
import { Text, Alert } from 'react-native';
import { TextCenter, AlertBox, AlertItem } from 'components/Text';
import Layout from 'components/Layout';
import ButtonView, { IconView } from 'components/Button';
import { UserAuth } from 'components/Contexts/UserContext';

const Authenticated = ({ navigation }) => {
  const { user } = React.useContext(UserAuth);

  const firstTime = () => {
    navigation.navigate('SystemSettings', {
      screen: 'Settings',
      params: { firstTime: true },
    });
  };

  return (
    <Layout>
      <FirstTimeCommerce goToSettings={firstTime} />
    </Layout>
  );
};

export default Authenticated;

export const FirstTimeCommerce = (props) => (
  <AlertBox>
    <AlertItem nameIcon={`error`} iconSize={35} color={`red`}>
      <TextCenter style={{ fontSize: 16 }}>
        Você é um comerciante e ainda não cadastrou seu espaço para seus
        clientes
      </TextCenter>
    </AlertItem>
    <ButtonView onPressFn={() => props.goToSettings()}>
      Cadastre seu marmitOffice!
    </ButtonView>
  </AlertBox>
);
