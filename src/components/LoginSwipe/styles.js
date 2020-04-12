import { StyleSheet, Dimensions } from 'react-native';

export const styleSwipe = StyleSheet.create({
  startUpView: {
    width: Dimensions.get('screen').width / 1.2,
    alignSelf: 'center',
    borderRadius: 15,
    position: 'absolute',
    bottom: 0,
    height: 50,
    backgroundColor: 'white',
    marginBottom: 25,
  },
  startUpButton: {
    backgroundColor: 'transparent',
    borderRadius: 15,
  },
  textStyleButton: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export const swiperContainer = StyleSheet.create({
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
  },
});
