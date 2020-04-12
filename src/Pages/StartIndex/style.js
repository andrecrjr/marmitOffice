import { StyleSheet } from 'react-native';

export const styled = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d62020',
  },
  logoMain: {
    fontFamily: 'Times New Roman',
    color: 'white',
    paddingTop: 150,
    fontSize: 50,
    alignSelf: 'center',
  },
  containerDescription: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 77,
    paddingRight: 77,
    backgroundColor: '#d62020',
  },
  description: {
    paddingTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textDescription: {
    fontSize: 15,
    color: '#F9F9F9',
    paddingTop: 2.5,
  },
});
