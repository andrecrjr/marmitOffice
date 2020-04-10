import React from 'react';
import {View, Text, Animated} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';

const AnimatedTest = () => {
  const translateY = new Animated.Value(0);
  let offset = 0;

  const animatedEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY,
        },
      },
    ],
    {useNativeDriver: true},
  );
  function onHandlerStateChange(event) {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      let opened = false;
      const {translationY} = event.nativeEvent;
      offset += translationY;
      if (translationY >= 50) {
        opened = true;
      } else {
        translateY.setValue(offset);
        translateY.setOffset(0);

        offset = 0;
      }
      Animated.timing(translateY, {
        toValue: opened ? 350 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        offset = opened ? 380 : 0;
        translateY.setOffset(offset);
        translateY.setValue(0);
      });

      // translateY.setOffset(offset);
      //translateY.setValue(0);
    }
  }
  return (
    <View>
      <PanGestureHandler
        onGestureEvent={animatedEvent}
        onHandlerStateChange={onHandlerStateChange}>
        <Animated.View
          style={{
            minHeight: 150,
            backgroundColor: 'green',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 5,

            transform: [
              {
                translateY: translateY.interpolate({
                  inputRange: [0, 400],
                  outputRange: [0, 400],
                  extrapolate: 'clamp',
                }),
              },
            ],
          }}></Animated.View>
      </PanGestureHandler>
      <Animated.Text
        style={{
          opacity: translateY.interpolate({
            inputRange: [0, 180],
            outputRange: [0, 1],
          }),
        }}>
        Testando opacidade kkkkkkkk
      </Animated.Text>
    </View>
  );
};

export default AnimatedTest;
