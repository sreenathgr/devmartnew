import HomeFilterButton from '@/components/HomeFilterButton/HomeFilterButton';
import AppConstants from '@/constants/appConstants';
import { Colors } from '@/constants/Colors';
import { useCartStore } from '@/hooks/useCart';
import useFetch from '@/hooks/useFetch';
import useGetCurrentUserData from '@/hooks/useGetCurrentUserData';
import { rh, rw } from '@/utils/responsiveScreenMeasures';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Timestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ProductProps = {
  id: string;
  productImg: string;
  productName: string;
  price: string;
  isFavorited: boolean;
};

type UserData = {
  uid: string;
  profileUrl: string;
  fullName: string;
  email: string;
  createdAt: Timestamp;
  curatedItems: ProductProps[];
};

const ProductRenderItem = ({
  item,
  onToggleFavorite,
  onPress,
  isInCart,
  onCartPress,
}: {
  item: ProductProps;
  onToggleFavorite: (id: string) => void;
  onPress: () => void;
  isInCart: boolean;
  onCartPress: () => void;
}) => (
  <Pressable
    onPress={onPress}
    style={styles.productCard}
  >
    <View>
      <Image
        source={{ uri: item.productImg }}
        style={styles.productImage}
        resizeMode='cover'
      />
      <Pressable
        onPress={() => onToggleFavorite(item.id)}
        style={styles.favoriteBadge}
      >
        <FontAwesome
          name={item.isFavorited ? 'heart' : 'heart-o'}
          size={15}
          color={item.isFavorited ? 'red' : 'white'}
        />
      </Pressable>
    </View>
    <Text style={styles.productNameText}>{item.productName}</Text>
    <Text style={styles.productPriceText}>${item.price}</Text>
    <View style={{ paddingTop: rh(2) }}>
      <Pressable
        onPress={onCartPress}
        style={({ pressed }) => [
          styles.cartButton,
          {
            backgroundColor: isInCart ? 'green' : 'purple',
            opacity: pressed ? 0.5 : 1,
          },
        ]}
      >
        <Text style={styles.cartButtonText}>
          {isInCart ? 'In Cart' : 'Move to Cart'}
        </Text>
      </Pressable>
    </View>
  </Pressable>
);

const FlatListHeader = ({
  insets,
  userData,
  searchQuery,
  handleSearch,
  filteredFeaturedProducts,
  onToggleFavorite,
  onProductPress,
  cartItems,
  onCartAction,
}: any) => (
  <View style={{ paddingTop: insets.top, paddingHorizontal: rw(5) }}>
    <View style={styles.headerTopRow}>
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        <Image
          source={{ uri: userData?.profileUrl }}
          style={styles.profileImage}
        />
        <View style={{ paddingStart: rw(4), flex: 1 }}>
          <Text style={{ color: '#7B8691', fontSize: 12 }}>WELCOME BACK</Text>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
            {userData?.fullName || 'Guest'}
          </Text>
        </View>
      </View>
      <View style={styles.iconContainer}>
        <FontAwesome
          name='bell'
          size={18}
          color='white'
        />
        <View style={styles.dot} />
      </View>
    </View>

    <View style={{ paddingTop: rh(3) }}>
      <TextInput
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={handleSearch}
        placeholder='Search for collections...'
        placeholderTextColor={'#7B8691'}
      />
      <Ionicons
        name='search-sharp'
        size={22}
        color='#7B8691'
        style={styles.searchIcon}
      />
      <MaterialIcons
        name='tune'
        size={22}
        color='#7B8691'
        style={styles.tuneIcon}
      />
    </View>

    <View style={{ paddingTop: rh(3) }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <HomeFilterButton label='All' />
        <HomeFilterButton
          marginStartFilterButton={rw(3)}
          label={'Shoes'}
        />
        <HomeFilterButton
          marginStartFilterButton={rw(3)}
          label={'Apparel'}
        />
        <HomeFilterButton
          marginStartFilterButton={rw(3)}
          label={'Accessories'}
        />
      </ScrollView>
    </View>

    <View style={styles.titleSection}>
      <Text style={styles.sectionTitle}>Featured Products</Text>
      <Text style={{ color: 'lightblue', fontSize: 14 }}>View all</Text>
    </View>

    <View style={styles.featuredGrid}>
      {filteredFeaturedProducts.map((item: ProductProps) => (
        <ProductRenderItem
          key={item.id}
          item={item}
          onToggleFavorite={onToggleFavorite}
          onPress={onProductPress}
          isInCart={cartItems.some((c: any) => c.id === item.id)}
          onCartPress={() => onCartAction(item)}
        />
      ))}
    </View>

    <View style={styles.titleSection}>
      <Text style={styles.sectionTitle}>Curated for you</Text>
      <Text style={{ color: 'lightblue', fontSize: 14 }}>View all</Text>
    </View>
  </View>
);

const Home = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const cartItems = useCartStore((state) => state.cartItems);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const {
    userData,
    userDataLoading,
  }: { userData: UserData | null; userDataLoading: boolean } =
    useGetCurrentUserData();
  const { data, loading: productsLoading } = useFetch<ProductProps[]>({
    url: `${AppConstants.API_BASE_URL}/shopease/products`,
  });

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [featuredProducts, setFeaturedProducts] = useState<ProductProps[]>([]);
  const [filteredFeaturedProducts, setFilteredFeaturedProducts] = useState<
    ProductProps[]
  >([]);
  const [curatedProducts, setCuratedProducts] = useState<ProductProps[]>([]);

  const isAppLoading = userDataLoading || productsLoading;

  useEffect(() => {
    setFeaturedProducts(data || []);
    setFilteredFeaturedProducts(data || []);
  }, [data]);

  useEffect(() => {
    setCuratedProducts(userData?.curatedItems || []);
  }, [userData]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredFeaturedProducts(featuredProducts);
    } else {
      const lowerCaseQuery = text.toLowerCase();
      const filtered = featuredProducts.filter((p) =>
        p.productName.toLowerCase().includes(lowerCaseQuery),
      );
      setFilteredFeaturedProducts(filtered);
    }
  };

  const handleCartAction = (item: ProductProps) => {
    const isInCart = cartItems.some((cartItem) => cartItem.id === item.id);
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
  };

  const toggleFavoriteFeatured = (productId: string) => {
    setFeaturedProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, isFavorited: !p.isFavorited } : p,
      ),
    );
    setFilteredFeaturedProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, isFavorited: !p.isFavorited } : p,
      ),
    );
  };

  const toggleFavoriteCurated = (productId: string) => {
    setCuratedProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, isFavorited: !p.isFavorited } : p,
      ),
    );
  };

  if (isAppLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size='large'
          color={Colors.acccentBlue}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#1e1b4b', '#0B0E14']}
        style={StyleSheet.absoluteFill}
      />

      <FlatList
        data={curatedProducts}
        numColumns={2}
        keyExtractor={(item) => `curated-${item.id}`}
        ListHeaderComponent={
          <FlatListHeader
            insets={insets}
            userData={userData}
            searchQuery={searchQuery}
            handleSearch={handleSearch}
            filteredFeaturedProducts={filteredFeaturedProducts}
            onToggleFavorite={toggleFavoriteFeatured}
            onProductPress={() => router.push('/(postAuth)/productDetails')}
            cartItems={cartItems}
            onCartAction={handleCartAction}
          />
        }
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: rh(5) }}
        columnWrapperStyle={{ paddingHorizontal: rw(4), gap: rw(4) }}
        renderItem={({ item }) => (
          <ProductRenderItem
            item={item}
            onToggleFavorite={toggleFavoriteCurated}
            onPress={() => router.push('/(postAuth)/productDetails')}
            isInCart={cartItems.some((c) => c.id === item.id)}
            onCartPress={() => handleCartAction(item)}
          />
        )}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0B0E14',
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#333',
  },
  iconContainer: {
    backgroundColor: '#21262E',
    padding: rw(3),
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  dot: {
    position: 'absolute',
    right: 12,
    top: 12,
    backgroundColor: 'green',
    width: 7,
    height: 7,
    borderRadius: 5,
  },
  searchInput: {
    color: 'white',
    borderWidth: 1,
    fontSize: 16,
    height: 55,
    borderColor: Colors.acccentBlue,
    backgroundColor: '#21262E',
    paddingHorizontal: rw(12),
    borderRadius: 18,
  },
  searchIcon: { position: 'absolute', top: rh(5), left: 15 },
  tuneIcon: { position: 'absolute', top: rh(5), right: 15 },
  titleSection: {
    paddingTop: rh(4),
    paddingBottom: rh(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: { color: 'white', fontSize: 20, fontWeight: '500' },
  featuredGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: '#21262E',
    width: '48%',
    paddingVertical: rh(3),
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: rh(2),
  },
  productImage: { width: 140, height: 140, borderRadius: 20 },
  favoriteBadge: {
    position: 'absolute',
    backgroundColor: '#21262E',
    padding: rw(2),
    borderRadius: 10,
    right: 5,
    top: 5,
  },
  productNameText: { color: 'white', marginTop: rh(1), fontWeight: '600' },
  productPriceText: { color: 'lightblue', marginTop: 4 },
  cartButton: {
    borderRadius: 12,
    paddingHorizontal: rw(5),
    paddingVertical: rh(1.5),
    alignItems: 'center',
  },
  cartButtonText: { color: 'white', fontWeight: 'bold' },
});
