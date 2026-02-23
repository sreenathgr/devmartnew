import { useCartStore } from '@/hooks/useCart';
import useWishListStore from '@/hooks/useWishlist';
import { rh, rw } from '@/utils/responsiveScreenMeasures';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  ImageBackground,
  Pressable,
  ScrollView,
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

type ProductProps = {
  id: string;
  productImg: string;
  productName: string;
  price: string;
  isFavorited: boolean;
  description: string;
};

const ProductDetails = () => {
  const insets = useSafeAreaInsets();

  const router = useRouter();
  const { productDetails } = useLocalSearchParams();
  const itemString = Array.isArray(productDetails)
    ? productDetails[0]
    : productDetails;
  const data: ProductProps = itemString ? JSON.parse(itemString) : {};
  const wishListItems = useWishListStore((state) => state.wishListItems);
  const isInWishList = wishListItems.some((item) => item.id === data.id);
  const cartItems = useCartStore((state) => state.cartItems);
  const isInCart = cartItems.some((item) => item.id === data.id);
  const [productItemCount, setProductItemCount] = useState<number>(1);
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

  const incrementItemCount = () => {
    setProductItemCount((prevProductItemCount) => prevProductItemCount + 1);
  };

  const decrementItemCount = () => {
    setProductItemCount((prevProductItemCount) =>
      Math.max(1, prevProductItemCount - 1),
    );
  };

  useEffect(() => {
    dot1Width.value = withSpring(currentPage === 0 ? 30 : 10);
    dot2Width.value = withSpring(currentPage === 1 ? 30 : 10);
    dot3Width.value = withSpring(currentPage === 2 ? 30 : 10);
  }, [currentPage]);
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
            {/* <Pressable
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
            </Pressable> */}
            <View style={{ paddingStart: rw(5) }}>
              <Pressable
                style={({ pressed }) => [
                  styles.iconContainer,
                  { opacity: pressed ? 0.5 : 1 },
                ]}
                onPress={() => {
                  if (isInWishList) {
                    useWishListStore.getState().removeItemFromWishList(data.id);
                  } else {
                    useWishListStore.getState().addItemToWishList(data);
                  }
                }}
              >
                {isInWishList ? (
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
          <Text style={{ color: 'white', fontSize: 28 }}>
            {data.productName}
          </Text>
        </View>
        <View>
          <Text style={{ color: 'white', fontSize: 28 }}>${data.price}</Text>
        </View>
        <View style={{ paddingTop: rh(2) }}>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontFamily: 'Manrope',
              fontStyle: 'italic',
            }}
          >
            {data.description}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingTop: rh(2),
            justifyContent: 'space-evenly',
          }}
        >
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: rw(3),
              backgroundColor: 'grey',
              borderRadius: 15,
            }}
          >
            <Pressable
              hitSlop={2}
              onPress={() => {
                decrementItemCount();
              }}
            >
              <Text style={{ fontSize: 25, color: 'white' }}>-</Text>
            </Pressable>
            <View style={{ paddingStart: rw(3) }}>
              <Text style={{ fontSize: 20, color: 'white' }}>
                {productItemCount}
              </Text>
            </View>
            <Pressable
              hitSlop={2}
              style={{ paddingStart: rw(3) }}
              onPress={() => {
                incrementItemCount();
              }}
            >
              <Text style={{ fontSize: 25, color: 'white' }}>+</Text>
            </Pressable>
          </Pressable>
          <Pressable
            onPress={() => {
              if (isInCart) {
                useCartStore.getState().removeFromCart(data.id);
              } else {
                useCartStore.getState().addToCart({
                  id: data.id,
                  price: Number(data.price),
                  productImg: data.productImg,
                  productName: data.productName,
                  itemCount: 1,
                });
              }
            }}
            style={({ pressed }) => [
              {
                flexDirection: 'row',
                backgroundColor: isInCart ? 'green' : 'purple',
                alignItems: 'center',
                padding: rw(3),
                borderRadius: 15,
                opacity: pressed ? 0.5 : 1,
              },
            ]}
          >
            <Ionicons
              name='cart'
              size={24}
              color='white'
            />
            <View style={{ paddingStart: rw(2) }}>
              <Text style={{ color: 'white' }}>
                {isInCart ? 'IN CART' : 'ADD TO CART'}
              </Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() =>
              router.push({
                pathname: '/(postAuth)/checkout',
                params: {
                  cartItemTotal: Number(data.price) * Number(productItemCount),
                },
              })
            }
            style={({ pressed }) => [
              {
                flexDirection: 'row',
                backgroundColor: 'white',
                alignItems: 'center',
                padding: rw(3),
                borderRadius: 15,
                opacity: pressed ? 0.5 : 1,
              },
            ]}
          >
            <AntDesign
              name='thunderbolt'
              size={15}
              color='black'
            />
            <View style={{ paddingStart: rw(2) }}>
              <Text style={{ color: 'black' }}>BUY NOW</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </ScrollView>
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
