import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

export const TextMiddle = styled.Text`
  color: black;
  padding-left: ${Dimensions.get('screen').width / 1.4};
  padding-right: ${Dimensions.get('screen').width / 1.4};
  font-size: 22px;
`;
