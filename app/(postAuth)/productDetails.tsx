import { rh, rw } from '@/utils/responsiveScreenMeasures';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ProductDetails = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const pagerRef = useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
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
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#1e1b4b', '#0B0E14']}
        style={StyleSheet.absoluteFill}
      />
      <View>
        <PagerView
          style={{ width: '100%', height: rh(50) }}
          initialPage={0}
          onPageSelected={onPageSelected}
          ref={pagerRef}
        >
          <ImageBackground
            source={require('@/assets/images/dummyImages/screenshot1.png')}
            key='1'
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          />
          <ImageBackground
            source={require('@/assets/images/dummyImages/screenshot2.png')}
            key='2'
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          />
          <ImageBackground
            source={require('@/assets/images/dummyImages/screenshot3.png')}
            resizeMode='stretch'
            key='3'
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          ></ImageBackground>
        </PagerView>
        <View
          style={{
            position: 'absolute',
            top: 20,
            left: 10,
            right: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              styles.iconContainer,
              { opacity: pressed ? 0.5 : 1 },
            ]}
          >
            <FontAwesome
              name='chevron-left'
              size={18}
              color='white'
            />
          </Pressable>
          <View style={{ flexDirection: 'row' }}>
            <Pressable
              style={({ pressed }) => [
                styles.iconContainer,
                { opacity: pressed ? 0.5 : 1 },
              ]}
            >
              <Entypo
                name='share'
                size={24}
                color='white'
              />
            </Pressable>
            <View style={{ paddingStart: rw(5) }}>
              <Pressable
                style={({ pressed }) => [
                  styles.iconContainer,
                  { opacity: pressed ? 0.5 : 1 },
                ]}
                onPress={() => setIsFavorited((prev) => !prev)}
              >
                {isFavorited ? (
                  <Entypo
                    name='heart'
                    size={24}
                    color='red'
                  />
                ) : (
                  <Entypo
                    name='heart-outlined'
                    size={24}
                    color='red'
                  />
                )}
              </Pressable>
            </View>
          </View>
        </View>
        <View style={{ position: 'absolute', bottom: 50, left: 170 }}>
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

                  marginStart: rw(2),
                },
                style2,
              ]}
            />
            <Animated.View
              style={[
                {
                  height: 6,
                  borderRadius: 60,

                  marginStart: rw(2),
                },
                style3,
              ]}
            />
          </View>
        </View>
      </View>
      <View style={{ paddingHorizontal: rw(5) }}>
        <View style={{ paddingTop: rh(2) }}>
          <Text style={{ color: 'white', fontSize: 28 }}>Headphones</Text>
        </View>
        <View>
          <Text style={{ color: 'white', fontSize: 28 }}>$85.00</Text>
        </View>
        <View>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontFamily: 'Manrope',
              fontStyle: 'italic',
            }}
          >
            Experience immersive high-fidelity sound with these premium over-ear
            headphones. Featuring advanced noise-cancellation technology, plush
            memory foam ear cushions, and a sleek, ergonomic design, they
            provide unparalleled comfort for all-day listening. With a 40-hour
            battery life and intuitive touch controls, enjoy crystal-clear audio
            and seamless connectivity wherever your music takes you.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: '#21262E',
    padding: rw(3),
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.3)',
  },
});
