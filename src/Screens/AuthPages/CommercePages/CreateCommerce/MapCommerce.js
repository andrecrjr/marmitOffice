import React, { useState, useEffect } from 'react';
import { Dimensions, Text, Platform } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';
import useGeolocation from 'components/hooks/useGeolocation';
const MapCommerce = () => {
  const { geoloc, grantGeolocation } = useGeolocation();
  const [marker, setMarker] = useState({});

  const [region, setRegion] = useState({
    region: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.0014,
      longitudeDelta: 0.0014,
    },
  });

  useEffect(() => {
    grantGeolocation();
    console.log(geoloc);
    setMarker({
      coords: {
        latitude: geoloc[0],
        longitude: geoloc[1],
      },
    });
    changeRegion(geoloc[0], geoloc[1]);
  }, [geoloc]);

  const changeRegion = (lat, lng) => {
    setRegion({
      region: {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0014,
        longitudeDelta: 0.0014,
      },
    });
  };
  return (
    <>
      <Text>
        Agora seu cadastro está quase pronto! Só precisamos que você pesquise
        seu endereço de venda fixa!
      </Text>
      <MapView style={{ flex: 1 }} region={region.region}>
        {marker.coords ? (
          <Marker
            draggable={true}
            coordinate={marker.coords}
            title={`Seu espaço será aqui?`}
            onDragEnd={(e) => {
              setMarker({ coords: e.nativeEvent.coordinate });
              changeRegion(
                e.nativeEvent.coordinate.latitude,
                e.nativeEvent.coordinate.longitude,
              );
            }}></Marker>
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
      minLength={3} // minimum length of text to search
      autoFocus={true}
      returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
      listViewDisplayed="true" // true/false/undefined
      fetchDetails={true}
      enablePoweredByContainer={false}
      styles={{
        container: {
          position: 'absolute',
          width: '100%',
          display: 'flex',
          top: Platform.select({ ios: 130, android: 110 }),
        },
        textInputContainer: {
          width: '90%',
          top: 0,
          backgroundColor: 'white',
          alignSelf: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 1,
            height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,

          elevation: 10,
        },
        listView: {
          backgroundColor: 'white',
        },
      }}
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
