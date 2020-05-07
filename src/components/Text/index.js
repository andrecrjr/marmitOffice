import React from 'react';
import { TextMiddle } from './style';

import { AlertBox, AlertItem } from './alerts';

export const TextCenter = ({ children, style }) => {
  return <TextMiddle style={style}>{children}</TextMiddle>;
};

export { AlertBox, AlertItem };
