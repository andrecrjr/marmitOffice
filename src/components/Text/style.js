import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

export const TextMiddle = styled.Text`
  color: black;
  font-size: 22px;
  font-family: Roboto;
  flex: 1;
`;

export const AlertWrapper = styled.View`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  padding: 10px;
`;

export const AlertItemBox = styled.View`
  display: flex;
  flex-direction: row;
  padding: 15px;
  flex-shrink: 1;
  background: gray;
`;
