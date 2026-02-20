import { rh, rw } from '@/utils/responsiveScreenMeasures';
import Entypo from '@expo/vector-icons/Entypo';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Checkout = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#1e1b4b', '#0B0E14']}
        style={StyleSheet.absoluteFill}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: insets.top - 10,
          alignItems: 'center',
          paddingHorizontal: rw(4),
        }}
      >
        <View>
          <Entypo
            name='chevron-left'
            size={35}
            color='white'
          />
        </View>
        <View>
          <Text
            style={{
              color: 'white',
              fontSize: 23,
              fontFamily: 'Manrope',
            }}
          >
            CHECKOUT
          </Text>
        </View>
        <View></View>
      </View>
      <View style={{ paddingHorizontal: rw(6) }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: rh(3),
          }}
        >
          <View>
            <Text style={{ color: 'white', fontSize: 15, letterSpacing: 3 }}>
              SHIPPING
            </Text>
          </View>
          <View>
            <Text
              style={{ color: 'white', fontSize: 15, fontFamily: 'Manrope' }}
            >
              CHANGE
            </Text>
          </View>
        </View>
        <View style={{ paddingTop: rh(3) }}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontFamily: 'Manrope',
              fontWeight: 'bold',
            }}
          >
            Alex Thompson
          </Text>
          <Text style={{ color: 'white', fontFamily: 'Manrope', fontSize: 20 }}>
            88 Market Street, Floor 12
          </Text>
          <Text style={{ color: 'white', fontFamily: 'Manrope', fontSize: 20 }}>
            San Francisco, CA 94105
          </Text>
          <Text style={{ color: 'white', fontFamily: 'Manrope', fontSize: 20 }}>
            United States
          </Text>
        </View>
        <View style={{ paddingTop: rh(2) }}>
          <View
            style={{
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: '#7B8691',
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: rh(3),
          }}
        >
          <View>
            <Text style={{ color: 'white', fontSize: 15, letterSpacing: 3 }}>
              PAYMENT
            </Text>
          </View>
          <View>
            <Text
              style={{ color: 'white', fontSize: 15, fontFamily: 'Manrope' }}
            >
              ADD NEW
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: rh(3),
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View>
              <Fontisto
                name='visa'
                size={24}
                color='white'
              />
            </View>
            <View style={{ paddingStart: rw(3) }}>
              <Text style={{ color: 'white', fontSize: 15, letterSpacing: 3 }}>
                PAYMENT
              </Text>
            </View>
          </View>
          <View>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 20,
                borderColor: 'white',
                width: 20,
                height: 20,
              }}
            ></View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: rh(3),
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View>
              <MaterialCommunityIcons
                name='apple-ios'
                size={32}
                color='white'
              />
            </View>
            <View style={{ paddingStart: rw(3) }}>
              <Text style={{ color: 'white', fontSize: 15, letterSpacing: 3 }}>
                APPLE PAY
              </Text>
            </View>
          </View>
          <View>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 20,
                borderColor: 'white',
                width: 20,
                height: 20,
              }}
            ></View>
          </View>
        </View>
        <View style={{ paddingTop: rh(2) }}>
          <View
            style={{
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: '#7B8691',
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({});
