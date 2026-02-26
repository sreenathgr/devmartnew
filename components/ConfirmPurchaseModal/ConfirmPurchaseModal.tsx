import { rh, rw } from '@/utils/responsiveScreenMeasures';
import Ionicons from '@expo/vector-icons/Ionicons';

import React from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type ConfirmPurchaseModalProps = {
  isVisible: boolean;
  totalAmount: number;
  selectedMethod: string;
  isConfirmButtonLoading: boolean;
  setConfirmButtonLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirmationModalVisibile: React.Dispatch<React.SetStateAction<boolean>>;
  addOrderDetailsToSpreadSheet: () => void;
};

const ConfirmPurchaseModal = ({
  isVisible,
  totalAmount,
  selectedMethod,
  addOrderDetailsToSpreadSheet,
  setConfirmationModalVisibile,
  isConfirmButtonLoading,
  setConfirmButtonLoading,
}: ConfirmPurchaseModalProps) => {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType='fade'
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View
          style={{
            backgroundColor: '#20293A',
            width: rw(85),
            height: rh(50),
            borderRadius: 20,
            alignItems: 'center',
          }}
        >
          <View style={{ paddingTop: rh(2) }}>
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: '#2d2d2d',
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: rw(2),
                  borderRadius: 30,
                  borderWidth: StyleSheet.hairlineWidth,
                  borderColor: 'white',
                },
              ]}
            >
              <Ionicons
                name='bag'
                size={20}
                color='white'
              />
            </Pressable>
          </View>
          <View style={{ paddingTop: rh(2) }}>
            <Text style={{ color: 'white', fontSize: 20 }}>
              Confirm Purchase
            </Text>
          </View>
          <View style={{ paddingTop: rh(1) }}>
            <Text style={{ color: '#7B8691', fontSize: 15 }}>
              Please review your final total
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: rh(2),
            }}
          >
            <View>
              <Text style={{ color: '#7B8691', fontSize: 20 }}>
                PAYMENT METHOD
              </Text>
            </View>
            <View style={{ paddingStart: rw(3) }} />
            <View>
              <Text style={{ color: 'white', fontSize: 20 }}>
                {selectedMethod === 'card' ? 'CREDIT CARD' : 'PAYPAL'}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: rh(2),
            }}
          >
            <View>
              <Text style={{ color: '#7B8691', fontSize: 20 }}>
                TOTAL AMOUNT
              </Text>
            </View>
            <View style={{ paddingStart: rw(3) }} />
            <View>
              <Text style={{ color: 'white', fontSize: 20 }}>
                ${totalAmount}
              </Text>
            </View>
          </View>
          <View style={{ paddingTop: rh(2) }}>
            {isConfirmButtonLoading ? (
              <View>
                <ActivityIndicator
                  size={20}
                  color={'red'}
                />
              </View>
            ) : (
              <Pressable
                onPress={() => {
                  setConfirmButtonLoading(true);
                  addOrderDetailsToSpreadSheet();
                }}
                style={{
                  backgroundColor: '#3B82F6',
                  height: 58,
                  borderRadius: 18,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: rw(10),
                }}
              >
                <Text style={{ color: 'white' }}>CONFIRM & PAY</Text>
              </Pressable>
            )}
          </View>
          <View style={{ paddingTop: rh(2) }}>
            <Pressable
              onPress={() => setConfirmationModalVisibile(false)}
              style={({ pressed }) => [
                {
                  backgroundColor: '#262F3F',
                  height: 58,
                  borderRadius: 18,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: StyleSheet.hairlineWidth,
                  borderColor: 'white',
                  paddingHorizontal: rw(15),
                  opacity: pressed ? 0.5 : 1,
                },
              ]}
            >
              <Text style={{ color: 'white' }}>CANCEL</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmPurchaseModal;

const styles = StyleSheet.create({});
