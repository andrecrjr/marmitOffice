import { CommerceSettings } from '../CommerceScreens/';
import { UserAuth } from 'components/Contexts/UserContext';
import { Text } from 'react-native';
import React from 'react';
import ButtonView from '../../../components/Button';

export default function Settings({ navigation, route }) {
  const { user, userData } = React.useContext(UserAuth);

  React.useEffect(() => {
    console.log(route);
    if (route.params.firstTime) {
      navigation.dangerouslyGetParent().setOptions({
        tabBarVisible: false,
      });
    }
    () => {
      navigation.dangerouslyGetParent.setOptions({
        tabBarVisible: false,
      });
    };
  }, [navigation, userData, route]);

  if (userData.commerceUser) {
    return (
      <>
        <CommerceSettings
          user={userData}
          creatingCommerce={route.params.firstTime ? true : false}
        />
      </>
    );
  }
  return <Text>Em manutenção</Text>;
}
