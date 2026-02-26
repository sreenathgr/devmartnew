import { Colors } from '@/constants/Colors';
import { useCartStore } from '@/hooks/useCart';
import useGetCurrentUserData from '@/hooks/useGetCurrentUserData';
import useWishListStore from '@/hooks/useWishlist';
import { rh, rw } from '@/utils/responsiveScreenMeasures';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { Timestamp } from 'firebase/firestore';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
type UserData = {
  uid: string;
  profileUrl: string;
  fullName: string;
  email: string;
  createdAt: Timestamp;
  wishlist: WishlistProductProps[];
};

type WishlistProductProps = {
  id: string;
  productImg: string;
  productName: string;
  price: string;
  isFavorited: boolean;
};

const WishListHeader = ({ userData }: { userData: UserData | null }) => {
  const insets = useSafeAreaInsets();
  const wishListItems = useWishListStore((state) => state.wishListItems);
  return (
    <View style={{ paddingHorizontal: rw(5), paddingBottom: rh(2) }}>
      <View style={{ paddingTop: insets.top }}>
        <Text
          style={{
            color: 'white',
            fontSize: 28,
            fontFamily: 'Manrope',
            fontWeight: 'bold',
          }}
        >
          My Wishlist
        </Text>
      </View>
      <View style={{ paddingTop: rh(1) }}>
        <Text style={{ color: 'skyblue', fontSize: 18 }}>
          {wishListItems.length} ITEMS
        </Text>
      </View>
    </View>
  );
};

const RenderWishListItem = ({ item }: { item: WishlistProductProps }) => {
  const cartItems = useCartStore((state) => state.cartItems);

  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const isInCart = cartItems.some((cartItem) => cartItem.id === item.id);

  const removeItemFromWishList = useWishListStore(
    (state) => state.removeItemFromWishList,
  );

  return (
    <View
      style={{
        backgroundColor: '#21262E',
        maxWidth: '48%',
        flex: 1,
        paddingVertical: rh(3),
        alignItems: 'center',
        borderRadius: 20,
        marginBottom: rh(2),
      }}
    >
      <View>
        <Image
          source={{ uri: item.productImg }}
          style={{ width: 150, height: 150, borderRadius: 20 }}
          resizeMode='cover'
        />
        <Pressable
          onPress={() => {
            removeItemFromWishList(item.id);
          }}
          style={({ pressed }) => [
            {
              position: 'absolute',
              backgroundColor: '#21262E',
              alignItems: 'center',
              justifyContent: 'center',
              padding: rw(2),
              borderRadius: 10,
              right: 5,
              top: 5,
              opacity: pressed ? 0.5 : 1,
            },
          ]}
        >
          {item?.isFavorited ? (
            <FontAwesome
              name='heart'
              size={15}
              color='red'
            />
          ) : (
            <FontAwesome
              name='heart-o'
              size={15}
              color='white'
            />
          )}
        </Pressable>
      </View>
      <Text style={{ color: 'white', marginTop: rh(1), fontWeight: '600' }}>
        {item.productName}
      </Text>
      <Text style={{ color: 'lightblue', marginTop: 4 }}>${item.price}</Text>
      <View style={{ paddingTop: rh(2) }}>
        <Pressable
          onPress={() => {
            if (isInCart) {
              removeFromCart(item.id);
            } else {
              addToCart({
                id: item.id,
                productImg: item.productImg,
                productName: item.productName,
                price: Number(item.price),
                itemCount: 1,
              });
            }
          }}
          style={({ pressed }) => [
            {
              borderRadius: 12,
              backgroundColor: isInCart ? 'green' : 'purple',
              paddingHorizontal: rw(8),
              paddingVertical: rh(1.5),
              opacity: pressed ? 0.5 : 1,
              alignItems: 'center',
            },
          ]}
        >
          <Text
            style={{
              color: 'white',
              fontFamily: 'Manrope',
              fontWeight: 'bold',
            }}
          >
            {isInCart ? 'In Cart' : 'Move to Cart'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const Wishlist = () => {
  const {
    userData,
    userDataLoading,
  }: { userData: UserData | null; userDataLoading: boolean } =
    useGetCurrentUserData();
  const wishListItems = useWishListStore((state) => state.wishListItems);

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#1e1b4b', '#0B0E14']}
        style={StyleSheet.absoluteFill}
      />
      {userDataLoading ? (
        <View style={styles.center}>
          <ActivityIndicator
            size='large'
            color={Colors.acccentBlue}
          />
        </View>
      ) : (
        <FlatList
          ListHeaderComponent={<WishListHeader userData={userData} />}
          numColumns={2}
          data={wishListItems}
          contentContainerStyle={{ paddingBottom: rh(5) }}
          columnWrapperStyle={{ paddingHorizontal: rw(4), gap: rw(4) }}
          renderItem={({ item }) => <RenderWishListItem item={item} />}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

export default Wishlist;

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
