import { auth } from '@/config/firebase/firebaseConfig';
import { Colors } from '@/constants/Colors';
import { rh, rw } from '@/utils/responsiveScreenMeasures';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react';

import { Image, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeDrawerButton from '../HomeDrawerButton/HomeDrawerButton';
const HomeDrawerContent = (props: DrawerContentComponentProps) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User signed out');
    } catch (error: any) {
      console.log('Failed to log out');
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.log('Listener detected logout, redirecting...');
        // Close drawer and send user back to the starting point (Splash/Index)
        props.navigation.closeDrawer();
        router.replace('/(auth)/login');
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);
  return (
    <LinearGradient
      colors={['#1e1b4b', '#0B0E14']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={StyleSheet.absoluteFill}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          paddingBottom: rh(3),
        }}
      >
        <View>
          <View
            style={{ paddingTop: insets.top + rw(2), paddingHorizontal: rw(6) }}
          >
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
          <View style={{ paddingTop: rw(7) }}>
            <View
              style={{
                backgroundColor: '#7B8691',
                borderWidth: StyleSheet.hairlineWidth,
              }}
            />
          </View>
          <View
            style={{
              paddingHorizontal: rw(5),
            }}
          >
            <HomeDrawerButton
              iconName='home'
              titleText='Home'
              iconColour='#7B8691'
              IconComponent={Ionicons}
            />
          </View>
          <View
            style={{
              paddingHorizontal: rw(5),
            }}
          >
            <HomeDrawerButton
              iconName='package'
              titleText='My Orders'
              iconColour='pink'
              topPadding={rh(2)}
              IconComponent={Feather}
            />
          </View>
          <View
            style={{
              paddingHorizontal: rw(5),
            }}
          >
            <HomeDrawerButton
              iconName='heart'
              titleText='My Wishlist'
              iconColour='pink'
              topPadding={rh(2)}
              IconComponent={Ionicons}
            />
          </View>
          <View
            style={{
              paddingHorizontal: rw(5),
            }}
          >
            <HomeDrawerButton
              iconName='wallet'
              titleText='Wallet'
              iconColour='green'
              topPadding={rh(2)}
              IconComponent={Ionicons}
            />
          </View>
          <View
            style={{
              paddingHorizontal: rw(5),
            }}
          >
            <HomeDrawerButton
              iconName='settings'
              titleText='Settings'
              iconColour='yellow'
              topPadding={rh(2)}
              IconComponent={Ionicons}
            />
          </View>
          <View
            style={{
              paddingHorizontal: rw(5),
            }}
          >
            <HomeDrawerButton
              iconName='help'
              titleText='Help & Support'
              iconColour='yellow'
              topPadding={rh(2)}
              IconComponent={Ionicons}
            />
          </View>
        </View>
        <View>
          <View style={{}}>
            <View
              style={{
                borderColor: '#7B8691',
                borderWidth: StyleSheet.hairlineWidth,
              }}
            />
          </View>
          <View
            style={{
              paddingHorizontal: rw(5),
            }}
          >
            <HomeDrawerButton
              onDrawerButtonPress={() => {
                handleLogout();
              }}
              iconName='logout'
              titleText='Logout'
              iconColour='red'
              topPadding={rh(2)}
              IconComponent={MaterialIcons}
              titleTextColor='red'
            />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default HomeDrawerContent;

const styles = StyleSheet.create({});
