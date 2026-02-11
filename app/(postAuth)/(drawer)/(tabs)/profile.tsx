import { rh, rw } from '@/utils/responsiveScreenMeasures';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const Profile = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, paddingHorizontal: rw(4) }}>
      <LinearGradient
        colors={['#1e1b4b', '#0B0E14']}
        style={StyleSheet.absoluteFill}
      />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: insets.top - 10,
            alignItems: 'center',
          }}
        >
          <View />
          <View>
            <Text
              style={{
                color: 'white',
                fontSize: 23,
                fontFamily: 'Manrope',
                fontWeight: 'bold',
              }}
            >
              Profile
            </Text>
          </View>
          <View>
            <View
              style={{
                backgroundColor: '#2d2d2d',
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                padding: rw(2),
                borderRadius: 30,
                borderWidth: StyleSheet.hairlineWidth,
                borderColor: 'white',
              }}
            >
              <Ionicons
                name='pencil-sharp'
                size={20}
                color='white'
              />
            </View>
          </View>
        </View>
        <View style={{ paddingTop: rh(3) }}>
          <View
            style={{
              backgroundColor: '#2d2d2d',
              alignItems: 'center',
              paddingBottom: rh(3),
              borderRadius: 20,
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: 'white',
            }}
          >
            <View style={{ paddingTop: rh(3) }}>
              <Image
                source={require('@/assets/images/dummyprofile.png')}
                style={{ width: 120, height: 120, borderRadius: 50 }}
                resizeMode='cover'
              />
            </View>
            <View style={{ paddingTop: rh(1) }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 25,
                  fontFamily: 'Manrope',
                  fontWeight: 'bold',
                }}
              >
                Alex Johnson
              </Text>
            </View>
            <View style={{ paddingTop: rh(1) }}>
              <Text style={{ color: '#7B8691', fontSize: 15 }}>
                alex.johnson@example.com
              </Text>
            </View>
            <View style={{ paddingTop: rh(1) }}>
              <View
                style={{
                  backgroundColor: '#5F6B76',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: rw(2),
                  borderRadius: 20,
                }}
              >
                <Text style={{ fontSize: 12, color: 'lightblue' }}>
                  PREMIUM MEMBER
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            paddingTop: rh(2),
            paddingStart: rw(3),
            paddingBottom: rh(2),
          }}
        >
          <Text
            style={{ color: '#7B8691', fontFamily: 'Manrope', fontSize: 14 }}
          >
            ACCOUNT
          </Text>
        </View>
        <View
          style={{
            backgroundColor: '#2d2d2d',

            paddingBottom: rh(2),
            borderRadius: 20,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: 'white',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: rh(1),
              paddingHorizontal: rw(5),
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  backgroundColor: '#5F6B76',
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: rw(2),
                  borderRadius: 15,
                  borderWidth: StyleSheet.hairlineWidth,
                  borderColor: 'white',
                }}
              >
                <FontAwesome
                  name='shopping-bag'
                  size={18}
                  color='green'
                />
              </View>
              <View style={{ paddingStart: rw(2) }}>
                <Text style={{ color: 'white', fontSize: 18 }}>My Orders</Text>
              </View>
            </View>
            <View>
              <Entypo
                name='chevron-right'
                size={24}
                color='#7B8691'
              />
            </View>
          </View>
          <View style={{ paddingTop: rh(1) }}>
            <View
              style={{
                borderColor: 'white',
                borderWidth: StyleSheet.hairlineWidth,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: rh(1),
              paddingHorizontal: rw(5),
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  backgroundColor: '#5F6B76',
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: rw(2),
                  borderRadius: 15,
                  borderWidth: StyleSheet.hairlineWidth,
                  borderColor: 'white',
                }}
              >
                <Entypo
                  name='location-pin'
                  size={24}
                  color='red'
                />
              </View>
              <View style={{ paddingStart: rw(2) }}>
                <Text style={{ color: 'white', fontSize: 18 }}>Addresses</Text>
              </View>
            </View>
            <View>
              <Entypo
                name='chevron-right'
                size={24}
                color='#7B8691'
              />
            </View>
          </View>
          <View style={{ paddingTop: rh(1) }}>
            <View
              style={{
                borderColor: 'white',
                borderWidth: StyleSheet.hairlineWidth,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: rh(1),
              paddingHorizontal: rw(5),
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  backgroundColor: '#5F6B76',
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: rw(2),
                  borderRadius: 15,
                  borderWidth: StyleSheet.hairlineWidth,
                  borderColor: 'white',
                }}
              >
                <MaterialIcons
                  name='payment'
                  size={24}
                  color='pink'
                />
              </View>
              <View style={{ paddingStart: rw(2) }}>
                <Text style={{ color: 'white', fontSize: 18 }}>Addresses</Text>
              </View>
            </View>
            <View>
              <Entypo
                name='chevron-right'
                size={24}
                color='#7B8691'
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
