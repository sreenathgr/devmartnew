import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { Colors } from '../../constants/Colors';

const Onboarding = () => {
  const router = useRouter();
  const pagerRef = useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const dot1Width = useSharedValue(10);
  const dot2Width = useSharedValue(10);
  const dot3Width = useSharedValue(10);
  const style1 = useAnimatedStyle(() => ({
    width: dot1Width.value,
    backgroundColor: withSpring(currentPage === 0 ? 'purple' : 'grey'),
  }));
  const style2 = useAnimatedStyle(() => ({
    width: dot2Width.value,
    backgroundColor: withSpring(currentPage === 1 ? 'purple' : 'grey'),
  }));
  const style3 = useAnimatedStyle(() => ({
    width: dot3Width.value,
    backgroundColor: withSpring(currentPage === 2 ? 'purple' : 'grey'),
  }));

  const onPageSelected = (e: any) => {
    setCurrentPage(e.nativeEvent.position);
  };

  useEffect(() => {
    dot1Width.value = withSpring(currentPage === 0 ? 30 : 10);
    dot2Width.value = withSpring(currentPage === 1 ? 30 : 10);
    dot3Width.value = withSpring(currentPage === 2 ? 30 : 10);
  }, [currentPage]);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.onboardingBackground }}>
      <Pressable
        onPress={async () => {
          await AsyncStorage.setItem('isFirstTime', 'false');
          router.replace('/(auth)/login');
        }}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.5 : 1,
            paddingTop: '10%',
            paddingEnd: '10%',
            alignSelf: 'flex-end',
          },
        ]}
      >
        <Text
          style={{
            color: Colors.backgroundLight,
            fontFamily: 'NewsReader',
            fontSize: 16,
          }}
        >
          SKIP
        </Text>
      </Pressable>
      <View style={{ paddingTop: '10%' }}>
        <PagerView
          style={{ width: '100%', height: '80%' }}
          initialPage={0}
          onPageSelected={onPageSelected}
          ref={pagerRef}
        >
          <ImageBackground
            source={require('@/assets/images/onboardingscreen1.png')}
            key='1'
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          />
          <ImageBackground
            source={require('@/assets/images/onboardingscreen2.png')}
            key='2'
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          />
          <ImageBackground
            source={require('@/assets/images/onboardingscreen3.png')}
            resizeMode='stretch'
            key='3'
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text style={{ color: 'white' }}>Premium Quality</Text>
          </ImageBackground>
        </PagerView>
        <View style={{ position: 'absolute', bottom: 80, left: 170 }}>
          <View style={{ flexDirection: 'row' }}>
            <Animated.View
              style={[
                {
                  height: 6,
                  borderRadius: 60,
                },
                style1,
              ]}
            />
            <Animated.View
              style={[
                {
                  height: 6,
                  borderRadius: 60,

                  marginStart: '8%',
                },
                style2,
              ]}
            />
            <Animated.View
              style={[
                {
                  height: 6,
                  borderRadius: 60,

                  marginStart: '8%',
                },
                style3,
              ]}
            />
          </View>
        </View>
        <View style={{ position: 'absolute', bottom: 0, left: 20, right: 20 }}>
          <Pressable
            onPress={async () => {
              if (currentPage < 2) {
                pagerRef?.current?.setPage(currentPage + 1);
              } else {
                await AsyncStorage.setItem('isFirstTime', 'false');
                console.log('navigate to login');
                router.replace('/(auth)/login');
              }
            }}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.5 : 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                backgroundColor: Colors.onboardingButton,
                padding: 15,
              },
            ]}
          >
            <Text
              style={{ color: 'white', fontFamily: 'NewsReader', fontSize: 18 }}
            >
              {currentPage < 2 ? 'Next' : 'Get Started'}
            </Text>
            <View style={{ paddingStart: 10, alignSelf: 'flex-end' }}>
              <AntDesign
                name='arrow-right'
                size={17}
                color='white'
              />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({});
