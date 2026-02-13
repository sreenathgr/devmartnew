import { rh, rw } from '@/utils/responsiveScreenMeasures';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type WishlistProductProps = {
  id: string;
  productImg: string;
  productName: string;
  price: string;
};

const Wishlist = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#1e1b4b', '#0B0E14']}
        style={StyleSheet.absoluteFill}
      />
      <View style={{ paddingHorizontal: rw(5) }}>
        <View style={{ paddingTop: insets.top }}>
          <Text
            style={{
              color: 'white',
              fontSize: 28,
              fontFamily: 'Manrope',
              fontWeight: 'bold',
            }}
          >
            My Wishlist
          </Text>
        </View>
        <View style={{ paddingTop: rh(1) }}>
          <Text style={{ color: 'skyblue', fontSize: 18 }}>12 ITEMS</Text>
        </View>
      </View>
    </View>
  );
};

export default Wishlist;

const styles = StyleSheet.create({});
