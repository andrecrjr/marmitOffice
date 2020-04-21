import { ButtonIcon } from 'components/Button';
import ImagePicker from 'react-native-image-picker';
import { View, Text } from 'react-native';
import React from 'react';

export default function AddPicture({ style }) {
  const [photoPath, setPath] = React.useState();
  const options = {
    title: 'Selecione foto para o estabelecimento',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const getImage = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        console.log(response);
        setPath(source);
      }
    });
  };
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
    </View>
  );
}
