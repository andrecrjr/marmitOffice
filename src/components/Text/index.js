import React from 'react';
import { TextMiddle } from './style';
const Text = ({ children }) => {
  return (
    <>
      <TextMiddle>{children}</TextMiddle>
    </>
  );
};

export default Text;
