import React, { useEffect } from 'react';
import { Text, Alert } from 'react-native';
import Layout from 'components/Layout';
import ButtonView from 'components/Button';
import { useAuthFirebase } from 'components/hooks/useAuth';
import { UserAuth } from 'components/Contexts/UserContext';
const Authenticated = (props) => {
  const { user, userData } = React.useContext(UserAuth);
  const firstTime = () => {
    props.navigation.navigate('Settings', {
      screen: 'Settings',
      params: { firstTime: true },
    });
  };

  console.log(props);

  return (
    <Layout>
      <Text>
        Você é um comerciante e ainda não cadastrou seu espaço para seus
        clientes:
      </Text>
      <ButtonView onPressFn={() => firstTime()}>
        Cadastre seu espaço de venda!
      </ButtonView>
      <Text>User authenticate {user ? user.email : ''}</Text>
    </Layout>
  );
};

export default Authenticated;
