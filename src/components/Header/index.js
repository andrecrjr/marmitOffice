import React from 'react';
import {Text, ScrollView, StyleSheet, View} from 'react-native';
import useAuthFirebase from '../hooks/useAuth';
import {styled} from './styles';
import ButtonView from '../Button';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

export default function Header({navigation}) {
  const [user, setUser] = React.useState(null);
  const navigator = useNavigation();
  const fetchUser = React.useCallback(() => {
    const getUser = async () => {
      const data = await auth().currentUser;
      setUser(data);
    };
    getUser();
  }, []);
  React.useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (user) {
    <View style={styled.container}>
      <Text>MarmitOffice</Text>
    </View>;
  }

  return (
    <View style={styled.container}>
      {user ? (
        <ButtonView onPressFn={() => navigator.openDrawer()}>Abrir</ButtonView>
      ) : null}

      <Text>MarmitOffice</Text>
    </View>
  );
}
