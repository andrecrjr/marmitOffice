import { Text } from 'react-native';
import { Button, TextButton, MenuButton } from './style';

import React from 'react';

export default function ButtonView({ styles, textStyle, onPressFn, children }) {
  return (
    <Button style={styles} onPress={onPressFn}>
      <TextButton style={textStyle}>{children}</TextButton>
    </Button>
  );
}
/*
export const MenuButton = () => {
  return <MenuButton />;
};
*/
