import { useCartStore } from '@/hooks/useCart';
import { rh, rw } from '@/utils/responsiveScreenMeasures';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient';
import { Router, useRouter } from 'expo-router';
import React, { useMemo } from 'react';
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
  productImg: string;
  productName: string;

  price: number;
  itemCount: number;
};

const CartListHeaderComponent = () => {
  const clearCart = useCartStore((state) => state.clearCart);
  const cartListData = useCartStore((state) => state.cartItems);
  const insets = useSafeAreaInsets();

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
        <View />
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
        <Pressable
          onPress={() => clearCart()}
          disabled={cartListData.length === 0}
        >
          <Text
            style={{
              color: cartListData.length === 0 ? '#7B8691' : 'white',
              fontFamily: 'Manrope',
              fontSize: 18,
            }}
          >
            Clear
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const CartListFooterComponent = ({
  cartItemTotal,
  router,
}: {
  cartItemTotal: number;
  router: Router;
}) => {
  const cartListData = useCartStore((state) => state.cartItems);
  return (
    <View style={{}}>
      {cartListData.length === 0 ? (
        <>
          <View style={{}}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                textAlign: 'center',
                fontFamily: 'Manrope',
              }}
            >
              Cart is Empty. Add Items to your Cart
            </Text>
          </View>
        </>
      ) : (
        <>
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
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View>
                <Text style={{ color: '#7B8691' }}>Subtotal</Text>
              </View>
              <View>
                <Text style={{ color: '#7B8691' }}>
                  ${cartItemTotal.toString()}
                </Text>
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
                <Text style={{ color: 'white', fontSize: 25 }}>
                  ${cartItemTotal.toString()}
                </Text>
              </View>
            </View>
            <View style={{ paddingTop: rh(3) }}>
              <Pressable
                onPress={() => {
                  router.push('/(postAuth)/checkout');
                }}
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
        </>
      )}
    </View>
  );
};

const Cart = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const cartListData = useCartStore((state) => state.cartItems);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const cartItemTotal = useMemo(() => {
    return Math.round(
      cartListData.reduce((acc, item) => acc + item.price * item.itemCount, 0),
    );
  }, [cartListData]);

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
            source={{ uri: item?.productImg }}
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
              style={{
                color: 'white',
                fontSize: 18,
                textAlignVertical: 'center',
              }}
            >
              ${Math.round(item?.price * item.itemCount).toString()}
            </Text>
          </View>
        </View>
        <View style={{ justifyContent: 'space-between' }}>
          <Pressable onPress={() => removeFromCart(item.id)}>
            <Text
              style={{ color: '#7B8691', textAlign: 'right', fontSize: 18 }}
            >
              X
            </Text>
          </Pressable>
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
              <Pressable
                onPress={() => decreaseQuantity(item.id)}
                hitSlop={3}
              >
                <Text style={{ color: 'white', fontSize: 23 }}>-</Text>
              </Pressable>
              <View style={{ paddingStart: rw(3) }}>
                <Text style={{ color: 'white', fontSize: 23 }}>
                  {item.itemCount.toString()}
                </Text>
              </View>
              <Pressable
                hitSlop={3}
                style={{ paddingStart: rw(3) }}
                onPress={() => {
                  increaseQuantity(item.id);
                }}
              >
                <Text style={{ color: 'white', fontSize: 23 }}>+</Text>
              </Pressable>
            </View>
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
          data={cartListData}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
          renderItem={cartItemsRenderItem}
          ListHeaderComponent={CartListHeaderComponent}
          ListFooterComponent={
            <CartListFooterComponent
              cartItemTotal={cartItemTotal}
              router={router}
            />
          }
          keyExtractor={(item: cartItemsType) => item.id}
        />
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({});
