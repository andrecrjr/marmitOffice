import { ButtonIcon, Iconic } from 'components/Button';
import ImagePicker from 'react-native-image-picker';
import { View, Text, Image, Dimensions } from 'react-native';
import React from 'react';
import { generateBlob } from '../../helper';

export default function AddPicture({ style, getImageData, data }) {
  const [imgBase64, setImage64] = React.useState(null);
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
          setImage64('data:image/jpeg;base64,' + response.data);
          generateBlob(response.data);
          getImageData({
            type: 'ADD_PHOTO',
            payload: {
              pathImage: response.uri,
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
        nameIcon="add-a-photo"
        size={30}
        color={'black'}
        onPress={getImage}
        style={{ alignSelf: 'center' }}
      />
      {imgBase64 ? (
        <View
          style={{
            paddingTop: 25,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Image
            source={{ uri: imgBase64 }}
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
