import React from 'react';
import { TextMiddle, AlertWrapper, AlertItemBox } from './style';
import { IconView } from '../Button';

export const TextCenter = ({ children, style }) => {
  return <TextMiddle style={style}>{children}</TextMiddle>;
};

export const AlertBox = ({ children, style }) => {
  return <AlertWrapper style={style}>{children}</AlertWrapper>;
};

export const AlertItem = ({
  children,
  style,
  nameIcon,
  iconSize,
  iconStyle,
  color,
}) => {
  return (
    <AlertItemBox style={style}>
      <IconView
        nameIcon={nameIcon}
        size={iconSize}
        color={color}
        iconStyle={[iconStyle, { alignSelf: 'center', paddingRight: 15 }]}
      />
      {children}
    </AlertItemBox>
  );
};
