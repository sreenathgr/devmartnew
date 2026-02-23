import { rh, rw } from '@/utils/responsiveScreenMeasures';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const OrderConfirm = () => {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: rh(10),
      }}
    >
      <LinearGradient
        colors={['#1e1b4b', '#0B0E14']}
        style={StyleSheet.absoluteFill}
      />
      <View
        style={{
          backgroundColor: '#13ec5b',
          width: 100,
          height: 100,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 50,
          shadowColor: '#13ec5b',
          shadowOffset: { width: 30, height: 30 },
          elevation: 20,
          alignSelf: 'center',
        }}
      >
        <Ionicons
          name='checkmark-sharp'
          size={55}
          color={'transparent'}
        />
      </View>
      <View>
        <View style={{ paddingHorizontal: rw(5) }}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Manrope',
              fontWeight: 'bold',
              fontSize: 50,
              textAlign: 'center',
            }}
          >
            Order Confirmed!
          </Text>
        </View>
        <View style={{ paddingHorizontal: rw(18) }}>
          <Text style={{ color: '#7B8691', textAlign: 'center', fontSize: 20 }}>
            Your journey with us has just began
          </Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: rw(18) }}>
        <Pressable
          onPress={() => router.replace('/(postAuth)/(drawer)/(tabs)/home')}
          style={({ pressed }) => [
            {
              backgroundColor: '#13ec5b',
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
              opacity: pressed ? 0.5 : 1,
            },
          ]}
        >
          <Text
            style={{
              fontSize: 18,
            }}
          >
            Continue Shopping
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default OrderConfirm;

const styles = StyleSheet.create({});
