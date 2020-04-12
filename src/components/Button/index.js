import { Text } from 'react-native';
import { Button, TextButton } from './style';

import React from 'react';

export default function ButtonView({ styles, textStyle, onPressFn, children }) {
  return (
    <Button style={styles} onPress={onPressFn}>
      <TextButton style={textStyle}>{children}</TextButton>
    </Button>
  );
}
