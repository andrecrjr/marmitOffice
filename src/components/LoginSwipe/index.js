import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import SwipeablePanel from 'components/Swipeable';
import ButtonView from 'components/Button';
import { styleSwipe, swiperContainer } from './styles';

export default function Swiper({ navigation }) {
  const [controlLogin, setControl] = React.useState(false);

  const closePanel = () => {
    setControl(false);
  };

  const openMenu = () => {
    setControl(!controlLogin);
  };

  return (
    <>
      <View style={styleSwipe.startUpView}>
        <ButtonView
          onPressFn={openMenu}
          styles={{ backgroundColor: 'white' }}
          textStyle={styleSwipe.textStyleButton}>
          Comece Já!
        </ButtonView>
      </View>
      <SwipeablePanel
        fullWidth
        isActive={controlLogin}
        onClose={closePanel}
        closeOnTouchOutside={true}
        onlySmall={true}
        style={{ height: Dimensions.get('screen').height / 1.4 }}>
        <View>
          <View style={swiperContainer.containerButton}>
            <ButtonView
              textStyle={swiperContainer.buttonText}
              onPressFn={() => navigation.push('Login')}>
              Login!
            </ButtonView>
          </View>
          <Text style={{ paddingTop: 15, textAlign: 'center' }}>
            Ainda não tem conta !?
          </Text>
          <View style={[swiperContainer.containerButton, { marginTop: 0 }]}>
            <ButtonView
              textStyle={swiperContainer.buttonText}
              onPressFn={() => navigation.push('Signup')}>
              Cadastre-se
            </ButtonView>
          </View>
        </View>
      </SwipeablePanel>
    </>
  );
}
