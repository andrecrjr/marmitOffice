import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

export const Button = styled.TouchableOpacity`
  align-self: center;
  height: 45px;
  border-radius: 15px;
  width: ${Dimensions.get('screen').width / 1.2}px;
  background: #d50000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TextButton = styled.Text`
  font-size: 16px;
`;

export const MenuButton = styled.TouchableHighlight`
  width: 100%;
  height: 50px;
  background: red;
`;
