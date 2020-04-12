import React, { useState } from 'react';
import { View, Text, TextInput, Dimensions } from 'react-native';
import { Input, TextError, InputDescription, ContainerInput } from './styles';
const FormInput = (
  { nameInput, onChangeText, onSubmitEditing, error, descriptionInput },
  ...props
) => {
  const [isFocused, setFocus] = useState(false);

  const handleFocus = () => {
    setFocus(!isFocused);
  };

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
