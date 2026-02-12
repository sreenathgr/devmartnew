import { rh, rw } from '@/utils/responsiveScreenMeasures';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type cartItemsType = {
  id: string;
  imgUrl: string;
  productName: string;
  variantName: string;
  price: number;
  itemCount: number;
};

const Cart = () => {
  const insets = useSafeAreaInsets();

  const MockData = [
    {
      id: '0',
      imgUrl: 'url/0',
      productName: 'Leather Tote',
      variantName: 'Cream White',
      price: 120.0,
      itemCount: 10,
    },
    {
      id: '1',
      imgUrl: 'url/1',
      productName: 'Cotton Crew Tee',
      variantName: 'Premium White',
      price: 35.0,
      itemCount: 0,
    },
    {
      id: '2',
      imgUrl: 'url/2',
      productName: 'Ceramic Mug',
      variantName: 'Matte Black',
      price: 120.0,
      itemCount: 0,
    },
  ];

  const cartItemsRenderItem = ({ item }: { item: cartItemsType }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',

          backgroundColor: '#2d2d2d',
          padding: rw(5),
          margin: rw(2),
          borderRadius: 20,
        }}
      >
        <View>
          <Image
            source={require('@/assets/images/dummyprofile.png')}
            style={{ width: 85, height: 85 }}
            resizeMode='contain'
          />
        </View>
        <View style={{ flex: 1, paddingStart: rw(5) }}>
          <View>
            <Text
              style={{ color: 'white', fontSize: 16 }}
              numberOfLines={1}
            >
              {item?.productName}
            </Text>
          </View>
          <View>
            <Text
              style={{ color: 'white' }}
              numberOfLines={1}
            >
              {item?.variantName}
            </Text>
          </View>
        </View>
        <View style={{ justifyContent: 'space-between' }}>
          <View>
            <Text style={{ color: 'white', textAlign: 'right', fontSize: 18 }}>
              ${item?.price.toString()}
            </Text>
          </View>
          <View style={{ paddingTop: rh(3) }}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#1a1a1a',
                alignItems: 'center',
                padding: rw(3),
                borderRadius: 20,
              }}
            >
              <View>
                <Text style={{ color: 'white', fontSize: 18 }}>-</Text>
              </View>
              <View style={{ paddingStart: rw(3) }}>
                <Text style={{ color: 'white', fontSize: 18 }}>
                  {item.itemCount}
                </Text>
              </View>
              <View style={{ paddingStart: rw(3) }}>
                <Text style={{ color: 'white', fontSize: 18 }}>+</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };
  const cartListHeaderComponent = () => {
    return (
      <View style={{ paddingBottom: rh(3) }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: insets.top - 18,
            alignItems: 'center',
          }}
        >
          <View>
            <Entypo
              name='chevron-left'
              size={38}
              color='white'
            />
          </View>
          <View>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Manrope',
                fontWeight: 'bold',
                fontSize: 25,
              }}
            >
              Cart
            </Text>
          </View>
          <View>
            <Text
              style={{ color: 'white', fontFamily: 'Manrope', fontSize: 18 }}
            >
              Clear
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const cartListFooterComponent = () => {
    return (
      <View>
        <View style={{ paddingTop: rh(3) }}>
          <View
            style={{
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: '#7B8691',
            }}
          />
        </View>
        <View style={{ paddingHorizontal: rw(5), paddingTop: rh(2) }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <View>
              <Text style={{ color: '#7B8691' }}>Subtotal</Text>
            </View>
            <View>
              <Text style={{ color: '#7B8691' }}>$214.00</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: rh(1),
            }}
          >
            <View>
              <Text style={{ color: '#7B8691' }}>Shipping</Text>
            </View>
            <View>
              <Text style={{ color: '#7B8691' }}>FREE</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: rh(1),
            }}
          >
            <View>
              <Text style={{ color: '#7B8691' }}>Estimated Tax</Text>
            </View>
            <View>
              <Text style={{ color: '#7B8691' }}>$0.00</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: rh(1),
              alignItems: 'center',
            }}
          >
            <View>
              <Text style={{ color: 'white', fontSize: 18 }}>Total</Text>
            </View>
            <View>
              <Text style={{ color: 'white', fontSize: 25 }}>$214.00</Text>
            </View>
          </View>
          <View style={{ paddingTop: rh(3) }}>
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 60,
                  borderRadius: 20,
                  opacity: pressed ? 0.5 : 1,
                },
              ]}
            >
              <View>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: 'Manrope',
                    fontWeight: 'bold',
                  }}
                >
                  Proceed to Checkout
                </Text>
              </View>
              <View style={{ paddingStart: rw(3) }}>
                <AntDesign
                  name='arrow-right'
                  size={18}
                  color='black'
                />
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#1e1b4b', '#0B0E14']}
        style={StyleSheet.absoluteFill}
      />
      <View style={{ flex: 1, paddingHorizontal: rw(3) }}>
        <FlatList
          style={{ flex: 1 }}
          data={MockData}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
          renderItem={cartItemsRenderItem}
          ListHeaderComponent={cartListHeaderComponent}
          ListFooterComponent={cartListFooterComponent}
          keyExtractor={(item: cartItemsType) => item.id}
        />
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({});
