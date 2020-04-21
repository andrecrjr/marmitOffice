import { ButtonIcon } from 'components/Button';
import React from 'react';

export default function AddPicture(props) {
  return (
    <ButtonIcon
      iconName="photo-camera"
      onPress={() => console.warn('clicou')}
    />
  );
}
