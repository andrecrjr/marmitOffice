import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Input,
  TextError,
  InputDescription,
  ContainerInput,
  DescriptionContainer,
} from './styles';
import CheckBox from '@react-native-community/checkbox';
import { View } from 'react-native';
Icon.loadFont();
const FormInput = (
  {
    nameInput,
    onChangeText,
    onSubmitEditing,
    error,
    styleWrap,
    iconName,
    descriptionInput,
    checkbox,
    onChange,
    isChecked,
  },
  ...props
) => {
  const [isFocused, setFocus] = useState(false);

  const handleFocus = () => {
    setFocus(!isFocused);
  };

  if (checkbox) {
    return (
      <ContainerInput checkbox={true} style={[styleWrap]}>
        <CheckBox onChange={onChange} value={isChecked} />
        <InputDescription>{descriptionInput}</InputDescription>
      </ContainerInput>
    );
  }

  return (
    <ContainerInput style={styleWrap}>
      {error ? <ErrorForm>{error.message}</ErrorForm> : null}
      <DescriptionContainer>
        {iconName ? <Icon name={iconName} size={21} /> : null}
        <InputDescription>{descriptionInput}</InputDescription>
      </DescriptionContainer>
      <Input
        underlineColorAndroid={isFocused ? 'black' : error ? 'red' : 'black'}
        onFocus={handleFocus}
        onChangeText={onChangeText}
        placeholder={nameInput}
      />
    </ContainerInput>
  );
};

export default FormInput;

export const ErrorForm = ({ children }) => {
  if (children !== '')
    return (
      <TextError>
        <Icon
          name="error"
          size={20}
          style={{ alignItems: 'center', paddingRight: 15 }}
        />
        {children}
      </TextError>
    );
  return null;
};
