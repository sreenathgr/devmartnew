import ConfirmPurchaseModal from '@/components/ConfirmPurchaseModal/ConfirmPurchaseModal';
import useGetCurrentUserData from '@/hooks/useGetCurrentUserData';
import { rh, rw } from '@/utils/responsiveScreenMeasures';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Fontisto from '@expo/vector-icons/Fontisto';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Timestamp } from 'firebase/firestore';
import React, { useState } from 'react';

import axios from 'axios';
import {
  ActivityIndicator,
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
  address: string;
  email: string;
  createdAt: Timestamp;
  curatedItems: ProductProps[];
};

const Checkout = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { cartItemTotal } = useLocalSearchParams();
  const [isConfirmationModalVisible, setConfirmationModalVisibile] =
    useState<boolean>(false);
  const [selectedMethod, setSelectedMethod] = useState<string>('card');
  const [confirmModalLoading, setConfirmModalLoading] =
    useState<boolean>(false);
  const {
    userData,
    userDataLoading,
  }: { userData: UserData | null; userDataLoading: boolean } =
    useGetCurrentUserData();
  const totalAmount = Number(cartItemTotal) + 9;
  const generateOrderId = () => {
    // Generates a random 4-digit number and attaches it to "100"
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    return `#100${randomSuffix}`;
  };

  const addOrderDetailsToSpreadSheet = async () => {
    const url = 'https://hook.eu2.make.com/6w2lkn95w3i6c5vlx65odht9kui7sxg2';
    const payload = {
      orderid: generateOrderId(),
      customerName: userData?.fullName,
      shippingAddress: userData?.address,
      paymentMethod: selectedMethod,
      orderTotal: Number(cartItemTotal) + 9,
    };

    try {
      const response = await axios.post(url, payload);
      if (response.status === 200) {
        console.log('Success', response.data);
        setConfirmationModalVisibile(false);
        router.replace('/(postAuth)/orderConfirm');
      }
    } catch (error: any) {
      console.error('errror sending data', error.message);
    } finally {
      setConfirmModalLoading(false);
    }
  };

  return (
    <>
      <LinearGradient
        colors={['#1e1b4b', '#0B0E14']}
        style={StyleSheet.absoluteFill}
      />
      {userDataLoading ? (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <ActivityIndicator
            size={30}
            color={'red'}
          />
        </View>
      ) : (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: insets.bottom + rh(3),
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: insets.top - 10,
              alignItems: 'center',
              paddingHorizontal: rw(4),
            }}
          >
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.5 : 1,
                },
              ]}
            >
              <Entypo
                name='chevron-left'
                size={35}
                color='white'
              />
            </Pressable>
            <View>
              <Text
                style={{
                  color: 'white',
                  fontSize: 23,
                  fontFamily: 'Manrope',
                }}
              >
                CHECKOUT
              </Text>
            </View>
            <View></View>
          </View>
          <View style={{ paddingHorizontal: rw(6) }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: rh(3),
              }}
            >
              <View>
                <Text
                  style={{ color: 'white', fontSize: 15, letterSpacing: 3 }}
                >
                  SHIPPING
                </Text>
              </View>
            </View>
            <View style={{ paddingTop: rh(3) }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  fontFamily: 'Manrope',
                  fontWeight: 'bold',
                }}
              >
                {userData?.fullName}
              </Text>
              <Text
                style={{ color: 'white', fontFamily: 'Manrope', fontSize: 20 }}
              >
                {userData?.address}
              </Text>
            </View>
            <View style={{ paddingTop: rh(2) }}>
              <View
                style={{
                  borderWidth: StyleSheet.hairlineWidth,
                  borderColor: '#7B8691',
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: rh(3),
              }}
            >
              <View>
                <Text
                  style={{ color: 'white', fontSize: 15, letterSpacing: 3 }}
                >
                  PAYMENT
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: rh(3),
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View>
                  <Fontisto
                    name='visa'
                    size={24}
                    color='white'
                  />
                </View>
                <View style={{ paddingStart: rw(3) }}>
                  <Text
                    style={{ color: 'white', fontSize: 15, letterSpacing: 3 }}
                  >
                    Credit Card
                  </Text>
                </View>
              </View>
              <View>
                <Pressable
                  onPress={() => {
                    setSelectedMethod('card');
                  }}
                  style={{
                    borderWidth: 1,
                    borderRadius: 20,
                    borderColor: 'white',
                    width: 20,
                    height: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {selectedMethod === 'card' && (
                    <View
                      style={{
                        width: 8,
                        height: 8,
                        backgroundColor: 'purple',
                        borderRadius: 20,
                      }}
                    />
                  )}
                </Pressable>
              </View>
            </View>
            {selectedMethod === 'card' && (
              <>
                <View style={{ paddingTop: rh(2) }}>
                  <Text style={{ color: '#7B8691' }}>CARD NUMBER</Text>
                </View>
                <View style={{ paddingTop: rh(1) }}>
                  <TextInput
                    style={{
                      height: 50,
                      backgroundColor: '#21262E',
                      paddingStart: rw(3),
                      borderWidth: 0.5,
                      color: '#7B8691',
                      fontSize: 18,
                    }}
                    placeholder='0000 0000 0000 0000'
                    placeholderTextColor={'#7B8691'}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    paddingTop: rh(2),
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <View style={{ paddingBottom: rh(1) }}>
                      <Text style={{ color: 'white' }}>EXPIRY</Text>
                    </View>
                    <TextInput
                      style={{
                        height: 50,
                        backgroundColor: '#21262E',

                        paddingStart: rw(3),
                        borderWidth: 0.5,
                        color: '#7B8691',
                        fontSize: 15,
                      }}
                      placeholder='MM/YY'
                      placeholderTextColor={'#7B8691'}
                    />
                  </View>
                  <View style={{ flex: 0.05 }}></View>
                  <View style={{ flex: 1 }}>
                    <View style={{ paddingBottom: rh(1) }}>
                      <Text style={{ color: 'white' }}>CVV</Text>
                    </View>
                    <TextInput
                      style={{
                        height: 50,
                        backgroundColor: '#21262E',

                        paddingStart: rw(3),
                        borderWidth: 0.5,
                        color: '#7B8691',
                        fontSize: 15,
                      }}
                      placeholder='000'
                      placeholderTextColor={'#7B8691'}
                    />
                  </View>
                </View>
              </>
            )}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: rh(3),
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View>
                  <FontAwesome5
                    name='cc-paypal'
                    size={24}
                    color='white'
                  />
                </View>
                <View style={{ paddingStart: rw(3) }}>
                  <Text
                    style={{ color: 'white', fontSize: 15, letterSpacing: 3 }}
                  >
                    PAYPAL
                  </Text>
                </View>
              </View>
              <View>
                <Pressable
                  onPress={() => {
                    setSelectedMethod('paypal');
                  }}
                  style={{
                    borderWidth: 1,
                    borderRadius: 20,
                    borderColor: 'white',
                    width: 20,
                    height: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {selectedMethod === 'paypal' && (
                    <View
                      style={{
                        width: 8,
                        height: 8,
                        backgroundColor: 'purple',
                        borderRadius: 20,
                      }}
                    />
                  )}
                </Pressable>
              </View>
            </View>
            {selectedMethod === 'paypal' && (
              <>
                <View style={{ paddingTop: rh(2) }}>
                  <Text style={{ color: '#7B8691' }}>PAYPAL EMAIL</Text>
                </View>
                <View style={{ paddingTop: rh(1) }}>
                  <TextInput
                    style={{
                      height: 50,
                      backgroundColor: '#21262E',

                      paddingStart: rw(3),
                      borderWidth: 0.5,
                      color: '#7B8691',
                      fontSize: 15,
                    }}
                    placeholder='example@paypal.com'
                    placeholderTextColor={'#7B8691'}
                  />
                </View>
              </>
            )}
            <View style={{ paddingTop: rh(2) }}>
              <View
                style={{
                  borderWidth: StyleSheet.hairlineWidth,
                  borderColor: '#7B8691',
                }}
              />
            </View>
            <View style={{ paddingTop: rh(3) }}>
              <Text style={{ color: 'white', fontSize: 15, letterSpacing: 3 }}>
                SUMMARY
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: rh(2),
              }}
            >
              <View>
                <Text style={{ color: '#7B8691', fontSize: 15 }}>Subtotal</Text>
              </View>
              <View>
                <Text style={{ color: 'white', fontSize: 15 }}>
                  ${cartItemTotal}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: rh(2),
              }}
            >
              <View>
                <Text style={{ color: '#7B8691', fontSize: 15 }}>Shipping</Text>
              </View>
              <View>
                <Text style={{ color: 'white', fontSize: 15 }}>$0</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: rh(2),
              }}
            >
              <View>
                <Text style={{ color: '#7B8691', fontSize: 15 }}>Tax</Text>
              </View>
              <View>
                <Text style={{ color: 'white', fontSize: 15 }}>$9.00</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: rh(2),
              }}
            >
              <View>
                <Text style={{ color: '#7B8691', fontSize: 20 }}>
                  Total Amount
                </Text>
              </View>
              <View>
                <Text style={{ color: 'white', fontSize: 25 }}>
                  ${totalAmount}
                </Text>
              </View>
            </View>
            <View style={{ paddingTop: rh(5) }}>
              <Pressable
                onPress={() => {
                  setConfirmationModalVisibile(true);
                }}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? 'green' : 'white',
                    height: 60,
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: pressed ? 0.5 : 1,
                  },
                ]}
              >
                <Text
                  style={{
                    fontFamily: 'Manrope',
                    fontSize: 20,
                    letterSpacing: 3,
                  }}
                >
                  PLACE ORDER
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      )}
      <ConfirmPurchaseModal
        isVisible={isConfirmationModalVisible}
        totalAmount={totalAmount}
        selectedMethod={selectedMethod}
        addOrderDetailsToSpreadSheet={addOrderDetailsToSpreadSheet}
        setConfirmationModalVisibile={setConfirmationModalVisibile}
        isConfirmButtonLoading={confirmModalLoading}
        setConfirmButtonLoading={setConfirmModalLoading}
      />
    </>
  );
};

export default Checkout;

const styles = StyleSheet.create({});
