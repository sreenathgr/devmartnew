import { rh, rw } from '@/utils/responsiveScreenMeasures';
import React from 'react';
import {
  DimensionValue,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type IconLibrary = any;

type HomeDrawerButtonProps = {
  IconComponent: IconLibrary;
  iconName: string;
  iconColour: string;
  titleText: string;
  titleTextColor?: string;
  topPadding?: DimensionValue;
  onDrawerButtonPress: () => {};
};

const HomeDrawerButton = ({
  IconComponent,
  iconName,
  iconColour,
  titleText,
  topPadding = rh(5),
  titleTextColor = '#7B8691',
  onDrawerButtonPress,
}: HomeDrawerButtonProps) => {
  return (
    <Pressable
      onPress={onDrawerButtonPress}
      style={({ pressed }) => [
        { paddingTop: topPadding, opacity: pressed ? 0.5 : 1 },
      ]}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: rw(3),
        }}
      >
        <IconComponent
          name={iconName}
          color={iconColour}
          size={20}
        />
        <View style={{ paddingStart: rw(5) }}>
          <Text style={{ color: titleTextColor, fontSize: 15 }}>
            {titleText}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default HomeDrawerButton;

const styles = StyleSheet.create({});
