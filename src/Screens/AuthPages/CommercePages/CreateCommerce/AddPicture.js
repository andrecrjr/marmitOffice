import { ButtonIcon, Iconic } from 'components/Button';
import ImagePicker from 'react-native-image-picker';
import { View, Text, Image, Dimensions } from 'react-native';
import React from 'react';
import convertBlob from '../../helper';

export default function AddPicture({ style, getImageData, data }) {
  const options = {
    title: 'Selecione foto para o estabelecimento',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const getImage = async () => {
    try {
      ImagePicker.showImagePicker(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          getImageData({
            type: 'ADD_PHOTO',
            payload: {
              pathImage: response.uri,
              uri: 'data:image/jpeg;base64,' + response.data,
            },
          });
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={[{ alignSelf: 'center', justifyContent: 'center' }, style]}>
      <Text>Selecione uma foto para seus clientes!</Text>
      <ButtonIcon
        nameIcon="photo-camera"
        size={30}
        color={'black'}
        onPress={getImage}
        style={{ alignSelf: 'center' }}
      />
      {data.pic.uri ? (
        <View
          style={{
            paddingTop: 25,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Image
            source={{ uri: data.pic.uri }}
            style={{
              width: 100,
              height: 100,
              alignSelf: 'center',
              borderRadius: 18,
            }}
          />
          <Iconic
            nameIcon={'done'}
            color={'green'}
            size={60}
            style={{
              position: 'absolute',
              bottom: 0,
              right: 45,
            }}
          />
        </View>
      ) : null}
    </View>
  );
}
