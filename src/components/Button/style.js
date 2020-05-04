import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

export const NearMeButton = styled.View`
  background: red;
  height: 95px;
  width: 103px;
  display: flex;
  flex-direction: column;
  border-radius: 100px;
  color: white;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: -15px;
  border-width: 8px;
  border-color: white;
`;

export const Button = styled.TouchableOpacity`
  align-self: center;
  height: 45px;
  color: white;
  border-radius: 15px;
  width: ${Dimensions.get('screen').width / 1.2}px;
  background: #d50000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TextButton = styled.Text`
  font-size: 14px;
  color: white;
  font-family: Roboto;
`;

export const MenuButton = styled.TouchableHighlight`
  width: 100%;
  height: 50px;
  background: red;
`;
