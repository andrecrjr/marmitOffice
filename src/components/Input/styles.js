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

export const ContainerInput = styled.View`
  display: flex;
  flex-direction: ${(props) => (props.checkbox ? `row` : `column`)};
  align-content: ${(props) => (props.checkbox ? `center` : `flex-start`)}
  align-self: center;
  width: ${(Dimensions.get('screen').width / 1.4).toFixed(0)}px;
  margin-top: 45px;
`;

export const DescriptionContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

export const InputDescription = styled.Text`
  align-self: center;
  font-family: Roboto;
  font-weight: bold;
  font-size: 15px;
`;
