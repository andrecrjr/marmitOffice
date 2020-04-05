import React, {useState} from 'react';
import {View, Text, TextInput, Dimensions} from 'react-native';

const FormInput = ({nameInput, onChangeText, onSubmitEditing}, ...props) => {
  const [isFocused, setFocus] = useState(false);

  const handleFocus = () => {
    setFocus(!isFocused);
  };

  return (
    <>
      <Text>{nameInput}</Text>
      <TextInput
        style={{
          height: 40,
          width: Dimensions.get('screen').width / 1.2,
          alignSelf: 'center',
        }}
        underlineColorAndroid={isFocused ? 'blue' : 'gray'}
        onFocus={handleFocus}
        onChangeText={onChangeText}
        placeholder={'digite seu username'}
      />
    </>
  );
};

export default FormInput;
