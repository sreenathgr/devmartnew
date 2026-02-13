import HomeFilterButton from '@/components/HomeFilterButton/HomeFilterButton';
import AppConstants from '@/constants/appConstants';
import { Colors } from '@/constants/Colors';
import useFetch from '@/hooks/useFetch';
import useGetCurrentUserData from '@/hooks/useGetCurrentUserData';
import { rh, rw } from '@/utils/responsiveScreenMeasures';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { Timestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type UserData = {
  uid: string;
  profileUrl: string;
  fullName: string;
  email: string;
  createdAt: Timestamp;
  curatedItems: ProductProps[];
};

type ProductProps = {
  id: string;
  productImg: string;
  productName: string;
  price: string;
};

const Home = () => {
  const insets = useSafeAreaInsets();
  const {
    userData,
    userDataLoading,
  }: { userData: UserData | null; userDataLoading: boolean } =
    useGetCurrentUserData();
  const { data, loading: productsLoading } = useFetch<ProductProps[]>({
    url: `${AppConstants.API_BASE_URL}/shopease/products`,
  });
  const [FeaturedProducts, setFeaturedProducts] = useState<ProductProps[]>([]);

  const isAppLoading = userDataLoading || productsLoading;

  useEffect(() => {
    setFeaturedProducts(data || []);
  }, [data]);

  const ProductRenderItem = ({ item }: { item: ProductProps }) => (
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
        <View
          style={{
            position: 'absolute',
            backgroundColor: '#21262E',
            alignItems: 'center',
            justifyContent: 'center',
            padding: rw(2),
            borderRadius: 10,
            right: 5,
            top: 5,
          }}
        >
          <FontAwesome
            name='heart'
            size={15}
            color='white'
          />
        </View>
      </View>
      <Text style={{ color: 'white', marginTop: rh(1), fontWeight: '600' }}>
        {item.productName}
      </Text>
      <Text style={{ color: 'lightblue', marginTop: 4 }}>${item.price}</Text>
    </View>
  );

  const FlatListHeader = () => (
    <View style={{ paddingTop: insets.top, paddingHorizontal: rw(5) }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <Image
            source={{ uri: userData?.profileUrl }}
            style={{
              width: 45,
              height: 45,
              borderRadius: 22.5,
              backgroundColor: '#333',
            }}
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
        <Text style={{ color: 'white', fontSize: 20, fontWeight: '500' }}>
          Featured Products
        </Text>
        <Text style={{ color: 'lightblue', fontSize: 14 }}>View all</Text>
      </View>
      <FlatList
        numColumns={2}
        data={FeaturedProducts}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: rh(5) }}
        columnWrapperStyle={{ gap: rw(4) }}
        renderItem={({ item }) => <ProductRenderItem item={item} />}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.titleSection}>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: '500' }}>
          Curated for you
        </Text>
        <Text style={{ color: 'lightblue', fontSize: 14 }}>View all</Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#1e1b4b', '#0B0E14']}
        style={StyleSheet.absoluteFill}
      />

      {isAppLoading ? (
        <View style={styles.center}>
          <ActivityIndicator
            size='large'
            color={Colors.acccentBlue}
          />
        </View>
      ) : (
        <FlatList
          data={userData?.curatedItems}
          numColumns={2}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={FlatListHeader}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: rh(5) }}
          columnWrapperStyle={{ paddingHorizontal: rw(4), gap: rw(4) }}
          renderItem={({ item }) => <ProductRenderItem item={item} />}
        />
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  searchIcon: {
    position: 'absolute',
    top: rh(5),
    left: 15,
  },
  tuneIcon: {
    position: 'absolute',
    top: rh(5),
    right: 15,
  },
  titleSection: {
    paddingTop: rh(4),
    paddingBottom: rh(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
