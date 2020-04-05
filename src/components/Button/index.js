import {TouchableOpacity, Text} from 'react-native';

import React from 'react';

export default function ButtonView({styles, textStyle, onPressFn, children}) {
  return (
    <TouchableOpacity style={[styles]} onPress={onPressFn}>
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
}
