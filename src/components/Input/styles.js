import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

export const Input = styled.TextInput`
  align-self: center;
  width: 100%;
`;

export const TextError = styled.TextInput`
  font-size: 15px;
  color: red;
`;

export const InputDescription = styled.Text`
  font-size: 16px;
  align-self: flex-start;
`;

export const ContainerInput = styled.View`
  display: flex;
  flex-direction: ${(props) => (props.checkbox ? `row` : `column`)};
  align-content: ${(props) => (props.checkbox ? `center` : `flex-start`)}
  align-self: center;
  width: ${(Dimensions.get('screen').width / 1.2).toFixed(0)}px;
  margin-top: 45px;
`;
