import React, { useEffect } from 'react';
import { Text, Alert } from 'react-native';
import { TextCenter, AlertBox, AlertItem } from 'components/Text';
import Layout from 'components/Layout';
import ButtonView, { IconView } from 'components/Button';
import { useAuthFirebase } from 'components/hooks/useAuth';
import { UserAuth } from 'components/Contexts/UserContext';

const Authenticated = ({ navigation }) => {
  const { user, userData } = React.useContext(UserAuth);
  const firstTime = () => {
    navigation.navigate('SystemSettings', {
      screen: 'Settings',
      params: { firstTime: true },
    });
  };

  return (
    <Layout>
      <AlertBox>
        <AlertItem nameIcon={`warning`} iconSize={20}>
          <TextCenter style={{ fontSize: 18, marginRight: 10 }}>
            Você é um comerciante e ainda não cadastrou seu espaço para seus
            clientes
          </TextCenter>
        </AlertItem>
        <ButtonView onPressFn={() => firstTime()}>
          Cadastre seu espaço de venda!
        </ButtonView>
      </AlertBox>

      <Text>User authenticate {user ? user.email : ''}</Text>
    </Layout>
  );
};

export default Authenticated;
