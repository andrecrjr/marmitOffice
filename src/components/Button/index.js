import { TouchableOpacity } from 'react-native';
import { Button, TextButton, MenuButton } from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
Icon.loadFont();
export default function ButtonView({
  styles,
  textStyle,
  onPressFn,
  children,
  iconName = null,
  header,
}) {
  return (
    <Button style={[styles]} onPress={onPressFn}>
      <TextButton style={textStyle}>{children}</TextButton>
    </Button>
  );
}
/*
export const MenuButton = () => {
  return <MenuButton />;
};
*/

export const ButtonIcon = ({ style, onPress, nameIcon, size = 22, color }) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Icon name={nameIcon} size={size} color={color} />
    </TouchableOpacity>
  );
};

export const Iconic = ({ style, nameIcon, size = 22, color }) => {
  return <Icon name={nameIcon} size={size} color={color} style={style} />;
};
