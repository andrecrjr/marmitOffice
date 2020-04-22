import { ButtonIcon } from 'components/Button';
import ImagePicker from 'react-native-image-picker';
import { View, Text, Image } from 'react-native';
import React from 'react';
import convertBlob from '../../helper';

export default function AddPicture({ style }) {
  const [photoPath, setImage] = React.useState();
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
        console.log('Response = ', response);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          setImage({
            pathImage: response.uri,
            uri: 'data:image/jpeg;base64,' + response.data,
          });
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
  React.useEffect(() => {
    console.log(photoPath);
  }, [photoPath]);
  return (
    <View style={[{ alignSelf: 'center' }, style]}>
      <Text>Selecione uma seus clientes!</Text>
      <ButtonIcon
        nameIcon="photo-camera"
        size={30}
        color={'black'}
        onPress={getImage}
        style={{ alignSelf: 'center' }}
      />
      {photoPath ? (
        <View style={{ paddingTop: 25 }}>
          <Text>Selecionou uma bela foto! ;)</Text>
          <Image
            source={{ uri: photoPath.uri }}
            style={{ width: 100, height: 100, alignSelf: 'center' }}
          />
        </View>
      ) : null}
    </View>
  );
}
