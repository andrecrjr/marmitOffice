import React from 'react';
import { View, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView from 'react-native-maps';

const MapCommerce = () => {
  return (
    <>
      <Text>
        Agora seu cadastro está quase pronto! Só precisamos que você pesquise
        seu endereço de venda fixa!
      </Text>
      <MapView
        style={{ height: 300 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation
      />
      <SearchMap />
    </>
  );
};

export default MapCommerce;

const SearchMap = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Seu endereço"
      minLength={4} // minimum length of text to search
      autoFocus={true}
      returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
      listViewDisplayed="true" // true/false/undefined
      fetchDetails={true}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log('bateu aqui');
        console.log(data);
      }}
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: 'AIzaSyBCU1ObyB-Y4vBktXI807gzohaKrPyTSfQ',
        language: 'pt', // language of the results
      }}
    />
  );
};
