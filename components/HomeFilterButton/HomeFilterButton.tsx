import { Colors } from '@/constants/Colors';
import { rh, rw } from '@/utils/responsiveScreenMeasures';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type HomeFilterButtonprops = {
  marginStartFilterButton?: number;
  label: string;
};

const HomeFilterButton = ({
  marginStartFilterButton = rw(0),
  label,
}: HomeFilterButtonprops) => {
  return (
    <View
      style={{
        marginStart: marginStartFilterButton,
        paddingHorizontal: rw(8),
        paddingVertical: rh(1),
        borderColor: Colors.acccentBlue,
        backgroundColor: '#21262E',
        borderWidth: 1,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: 'white' }}>{label}</Text>
    </View>
  );
};

export default HomeFilterButton;

const styles = StyleSheet.create({});
