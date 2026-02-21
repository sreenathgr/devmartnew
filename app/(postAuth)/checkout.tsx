import { rh, rw } from '@/utils/responsiveScreenMeasures';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Fontisto from '@expo/vector-icons/Fontisto';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Checkout = () => {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: insets.bottom + rh(3),
      }}
    >
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
        <Pressable
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.5 : 1,
            },
          ]}
        >
          <Entypo
            name='chevron-left'
            size={35}
            color='white'
          />
        </Pressable>
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
                Credit Card
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
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <View
                style={{
                  width: 8,
                  height: 8,
                  backgroundColor: 'purple',
                  borderRadius: 20,
                }}
              />
            </View>
          </View>
        </View>
        <View style={{ paddingTop: rh(2) }}>
          <Text style={{ color: '#7B8691' }}>CARD NUMBER</Text>
        </View>
        <View style={{ paddingTop: rh(1) }}>
          <TextInput
            style={{
              height: 50,
              backgroundColor: '#21262E',

              paddingStart: rw(3),
              borderWidth: 0.5,
              color: '#7B8691',
              fontSize: 15,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            paddingTop: rh(2),
          }}
        >
          <View style={{ flex: 1 }}>
            <View style={{ paddingBottom: rh(1) }}>
              <Text style={{ color: 'white' }}>EXPIRY</Text>
            </View>
            <TextInput
              style={{
                height: 50,
                backgroundColor: '#21262E',

                paddingStart: rw(3),
                borderWidth: 0.5,
                color: '#7B8691',
                fontSize: 15,
              }}
            />
          </View>
          <View style={{ flex: 0.05 }}></View>
          <View style={{ flex: 1 }}>
            <View style={{ paddingBottom: rh(1) }}>
              <Text style={{ color: 'white' }}>CVV</Text>
            </View>
            <TextInput
              style={{
                height: 50,
                backgroundColor: '#21262E',

                paddingStart: rw(3),
                borderWidth: 0.5,
                color: '#7B8691',
                fontSize: 15,
              }}
            />
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
              <FontAwesome5
                name='cc-paypal'
                size={24}
                color='white'
              />
            </View>
            <View style={{ paddingStart: rw(3) }}>
              <Text style={{ color: 'white', fontSize: 15, letterSpacing: 3 }}>
                PAYPAL
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
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* <View
                style={{
                  width: 8,
                  height: 8,
                  backgroundColor: 'purple',
                  borderRadius: 20,
                }}
              /> */}
            </View>
          </View>
        </View>
        <View style={{ paddingTop: rh(2) }}>
          <Text style={{ color: '#7B8691' }}>PAYPAL EMAIL</Text>
        </View>
        <View style={{ paddingTop: rh(1) }}>
          <TextInput
            style={{
              height: 50,
              backgroundColor: '#21262E',

              paddingStart: rw(3),
              borderWidth: 0.5,
              color: '#7B8691',
              fontSize: 15,
            }}
          />
        </View>
        <View style={{ paddingTop: rh(2) }}>
          <View
            style={{
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: '#7B8691',
            }}
          />
        </View>
        <View style={{ paddingTop: rh(3) }}>
          <Text style={{ color: 'white', fontSize: 15, letterSpacing: 3 }}>
            SUMMARY
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: rh(2),
          }}
        >
          <View>
            <Text style={{ color: '#7B8691', fontSize: 15 }}>Subtotal</Text>
          </View>
          <View>
            <Text style={{ color: 'white', fontSize: 15 }}>$1,240.00</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: rh(2),
          }}
        >
          <View>
            <Text style={{ color: '#7B8691', fontSize: 15 }}>Shipping</Text>
          </View>
          <View>
            <Text style={{ color: 'white', fontSize: 15 }}>$0</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: rh(2),
          }}
        >
          <View>
            <Text style={{ color: '#7B8691', fontSize: 15 }}>Tax</Text>
          </View>
          <View>
            <Text style={{ color: 'white', fontSize: 15 }}>$9.00</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: rh(2),
          }}
        >
          <View>
            <Text style={{ color: '#7B8691', fontSize: 20 }}>Total Amount</Text>
          </View>
          <View>
            <Text style={{ color: 'white', fontSize: 25 }}>$1,249.00</Text>
          </View>
        </View>
        <View style={{ paddingTop: rh(5) }}>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? 'green' : 'white',
                height: 60,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: pressed ? 0.5 : 1,
              },
            ]}
          >
            <Text
              style={{
                fontFamily: 'Manrope',
                fontSize: 20,
                letterSpacing: 3,
              }}
            >
              PLACE ORDER
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default Checkout;

const styles = StyleSheet.create({});
