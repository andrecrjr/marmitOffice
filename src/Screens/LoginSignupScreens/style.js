import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

export const Title = styled.Text`
  font-size: 26px;
  align-self: center;
  margin-top: 75px;
  font-family: Roboto;
  font-weight: bold;
  color: #df3030;
  margin-right: ${Dimensions.get('screen').width / 1.4}px;
`;
