import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';

const MapCommerce = () => {
  const [region, setRegion] = useState({
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0024,
      longitudeDelta: 0.0024,
    },
  });

  const changeRegion = (region) => {
    setRegion({ region: region });
  };

  const [marker, setMarker] = useState({});

  return (
    <>
      <Text>
        Agora seu cadastro está quase pronto! Só precisamos que você pesquise
        seu endereço de venda fixa!
      </Text>
      <MapView
        style={{ height: 600 }}
        region={region.region}
        onRegionChange={changeRegion}>
        {marker.coords ? (
          <Marker
            draggable={true}
            coordinate={marker.coords}
            title={`Seu espaço será aqui?`}
            onDragEnd={(e) =>
              setMarker({ coords: e.nativeEvent.coordinate })
            }></Marker>
        ) : null}
      </MapView>
      <SearchMap getData={setRegion} setMarker={setMarker} />
    </>
  );
};

export default MapCommerce;

const SearchMap = ({ getData, setMarker }) => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Seu endereço"
      minLength={4} // minimum length of text to search
      autoFocus={true}
      returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
      listViewDisplayed="true" // true/false/undefined
      fetchDetails={true}
      onPress={(data, details) => {
        // 'details' is provided when fetchDetails = true
        setMarker({
          coords: {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
          },
        });
        getData({
          region: {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.0024,
            longitudeDelta: 0.0024,
          },
        });
      }}
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: 'AIzaSyBCU1ObyB-Y4vBktXI807gzohaKrPyTSfQ',
        language: 'pt', // language of the results
      }}
    />
  );
};
