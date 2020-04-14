import React, { useState } from 'react';
import { View, Text, TextInput, Dimensions } from 'react-native';
import { Input, TextError, InputDescription, ContainerInput } from './styles';
import CheckBox from '@react-native-community/checkbox';
const FormInput = (
  {
    nameInput,
    onChangeText,
    onSubmitEditing,
    error,
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
      <ContainerInput checkbox={true} style={{ paddingBottom: 35 }}>
        <CheckBox onChange={onChange} value={isChecked} />
        <InputDescription>{descriptionInput}</InputDescription>
      </ContainerInput>
    );
  }

  return (
    <ContainerInput>
      {error ? <TextError>{error.message}</TextError> : null}
      <InputDescription>{descriptionInput}</InputDescription>
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
