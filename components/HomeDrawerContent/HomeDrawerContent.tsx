import { Colors } from '@/constants/Colors';
import { rw } from '@/utils/responsiveScreenMeasures';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const HomeDrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <LinearGradient
      colors={['#1e1b4b', '#0B0E14']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={StyleSheet.absoluteFill}
    >
      <View style={{ flex: 1 }}>
        <View style={{ paddingTop: rw(3), paddingHorizontal: rw(6) }}>
          <View
            style={{
              borderColor: Colors.acccentBlue,
              borderWidth: 1,
              width: 80,
              height: 80,
              borderRadius: 10,
            }}
          >
            <View style={{ padding: rw(3), borderRadius: 10 }}>
              <Image
                source={require('@/assets/images/dummyprofile.png')}
                resizeMode='center'
                style={{ width: '100%', height: '100%' }}
              />
            </View>
          </View>
          <View style={{ paddingTop: '7%' }}>
            <Text style={{ color: 'white', fontSize: 20 }}>Alex Rivera</Text>
          </View>
          <View>
            <Text style={{ color: '#7B8691' }}>alex.rivera@premium.com</Text>
          </View>
        </View>
        <View style={{ paddingTop: rw(5) }}>
          <View
            style={{
              backgroundColor: '#7B8691',
              borderWidth: StyleSheet.hairlineWidth,
            }}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default HomeDrawerContent;

const styles = StyleSheet.create({});
