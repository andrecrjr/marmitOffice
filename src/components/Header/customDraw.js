import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { View, Text } from 'react-native';

export default function HeaderDrawer({ progress, ...rest }) {
  return (
    <DrawerContentScrollView {...rest}>
      <View style={{ marginTop: 35 }}>
        <DrawerItemList {...rest} />
        {/* <DrawerItem label="Help" onPress={() => alert('Link to help')} /> */}
      </View>
    </DrawerContentScrollView>
  );
}
