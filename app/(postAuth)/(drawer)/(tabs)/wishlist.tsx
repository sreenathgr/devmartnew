import useGetCurrentUserData from '@/hooks/useGetCurrentUserData';
import { rh, rw } from '@/utils/responsiveScreenMeasures';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { Timestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
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

const Wishlist = () => {
  const insets = useSafeAreaInsets();
  const {
    userData,
    userDataLoading,
  }: { userData: UserData | null; userDataLoading: boolean } =
    useGetCurrentUserData();
  const [wishListData, setWishListData] = useState<WishlistProductProps[]>([]);

  useEffect(() => {
    if (userData) {
      setWishListData(userData?.wishlist || []);
    }
  }, [userData]);
  const RenderWishListItem = ({
    item,
    onToggleFavorite,
  }: {
    item: WishlistProductProps;
    onToggleFavorite: (id: string) => void;
  }) => {
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
              onToggleFavorite(item.id);
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
      </View>
    );
  };

  const toggleFavorite = (productId: string) => {
    setWishListData((prevWishListData) => {
      return prevWishListData.map((product) => {
        if (product.id === productId) {
          return { ...product, isFavorited: !product.isFavorited };
        }
        return product;
      });
    });
  };
  const WishListHeader = () => {
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
            {userData?.wishlist?.length} ITEMS
          </Text>
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

      <FlatList
        ListHeaderComponent={WishListHeader}
        numColumns={2}
        data={wishListData}
        contentContainerStyle={{ paddingBottom: rh(5) }}
        columnWrapperStyle={{ paddingHorizontal: rw(4), gap: rw(4) }}
        renderItem={({ item }) => (
          <RenderWishListItem
            item={item}
            onToggleFavorite={toggleFavorite}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Wishlist;

const styles = StyleSheet.create({});
