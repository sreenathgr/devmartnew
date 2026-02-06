import { Colors } from '@/constants/Colors';
import useGetCurrentUserData from '@/hooks/useGetCurrentUserData';
import { rh, rw } from '@/utils/responsiveScreenMeasures';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { Timestamp } from 'firebase/firestore';
import React from 'react';
import {
  ActivityIndicator,
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
};
const Home = () => {
  const insets = useSafeAreaInsets();
  const {
    userData,
    userDataLoading,
  }: { userData: UserData | null; userDataLoading: boolean } =
    useGetCurrentUserData();
  return (
    <LinearGradient
      colors={['#1e1b4b', '#0B0E14']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={StyleSheet.absoluteFill}
    >
      <>
        {userDataLoading ? (
          <View
            style={{
              flex: 1,

              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ActivityIndicator
              size='large'
              color={Colors.acccentBlue}
            />
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <View style={{ paddingTop: insets.top, paddingHorizontal: rw(5) }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,
                  }}
                >
                  <Image
                    source={{ uri: userData?.profileUrl }}
                    style={{ width: 45, height: 45, borderRadius: 22.5 }}
                  />

                  <View style={{ paddingStart: rw(5), flex: 1 }}>
                    <Text style={{ color: '#7B8691', fontSize: 13 }}>
                      WELCOME BACK
                    </Text>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}
                    >
                      {userData?.fullName}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    backgroundColor: '#21262E',
                    padding: rw(3),
                    borderRadius: 25,
                    borderWidth: StyleSheet.hairlineWidth + 0.1,
                    borderColor: 'white',
                    overflow: 'hidden',
                  }}
                >
                  <FontAwesome
                    name='bell'
                    size={20}
                    color='white'
                  />
                  <View style={{ position: 'absolute', right: 13, top: 15 }}>
                    <View
                      style={{
                        backgroundColor: 'green',
                        width: 7,
                        height: 7,
                        borderRadius: 20,
                      }}
                    />
                  </View>
                </View>
              </View>
              <View style={{ paddingTop: rh(3) }}>
                <TextInput
                  style={{
                    color: 'white',
                    borderWidth: 1,
                    fontSize: 17,
                    height: 60,
                    borderColor: Colors.acccentBlue,
                    backgroundColor: '#21262E',
                    paddingHorizontal: rw(11),
                    borderRadius: 20,
                    overflow: 'hidden',
                  }}
                  placeholder='Search for collections...'
                  placeholderTextColor={'#7B8691'}
                />
                <View style={{ position: 'absolute', top: 43, left: 15 }}>
                  <Ionicons
                    name='search-sharp'
                    size={24}
                    color='#7B8691'
                  />
                </View>
                <View style={{ position: 'absolute', top: 43, right: 15 }}>
                  <MaterialIcons
                    name='tune'
                    size={24}
                    color='#7B8691'
                  />
                </View>
              </View>
              <ScrollView
                horizontal
                style={{
                  width: '100%',
                  height: 90,
                  paddingTop: rh(5),
                }}
              >
                <View
                  style={{
                    paddingHorizontal: rw(8),
                    paddingVertical: rh(1),
                    borderColor: Colors.acccentBlue,
                    backgroundColor: '#21262E',
                    borderWidth: 1,
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ color: 'white' }}>All</Text>
                </View>
              </ScrollView>
            </View>
          </View>
        )}
      </>
    </LinearGradient>
  );
};

export default Home;

const styles = StyleSheet.create({});
