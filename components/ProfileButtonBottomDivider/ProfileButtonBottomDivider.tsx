import { rh } from '@/utils/responsiveScreenMeasures';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const ProfileButtonBottomDivider = () => {
  return (
    <View style={{ paddingTop: rh(1) }}>
      <View
        style={{
          borderColor: 'white',
          borderWidth: StyleSheet.hairlineWidth,
        }}
      />
    </View>
  );
};

export default ProfileButtonBottomDivider;

const styles = StyleSheet.create({});
