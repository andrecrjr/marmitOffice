import React, { useState, useEffect, useContext } from 'react';
import { Dimensions, Text, Platform } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';
import useGeolocation from 'components/hooks/useGeolocation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GeoContext } from 'components/Contexts/LocationContext';

Icon.loadFont();
const MapCommerce = ({ getLocation }) => {
  // const geoloc = useGeolocation();
  const geoloc = useContext(GeoContext);
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
    setMarker({
      coords: {
        latitude: geoloc.latitude,
        longitude: geoloc.longitude,
      },
    });
    changeRegion(geoloc);
  }, [geoloc]);

  const changeRegion = ({ latitude, longitude }) => {
    setRegion({
      region: {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0014,
        longitudeDelta: 0.0014,
      },
    });
  };
  return (
    <>
      <Text
        style={{
          alignSelf: 'center',
          paddingTop: 25,
          paddingBottom: 25,
          fontSize: 18,
          fontWeight: 'bold',
        }}>
        Adicione seu local de venda!
      </Text>
      <MapView style={{ flex: 1 }} region={region.region}>
        {marker.coords ? (
          <Marker
            draggable={true}
            coordinate={marker.coords}
            title={`Seu espaço de venda é aqui?`}
            onDragEnd={(e) => {
              setMarker({ coords: e.nativeEvent.coordinate });
              changeRegion(e.nativeEvent.coordinate);
              getLocation(e.nativeEvent.coordinate);
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
          top: Platform.select({ ios: 155, android: 165 }),
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
