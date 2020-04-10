import {StyleSheet, Dimensions} from 'react-native';

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
    paddingTop: 10,
  },
});

export const swiperContainer = StyleSheet.create({
  containerButton: {
    alignSelf: 'center',
    height: 45,
    borderRadius: 15,
    width: Dimensions.get('screen').width / 1.2,
    backgroundColor: '#D50000',
    flex: 1,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    paddingTop: 10,
    color: 'white',
  },
});
