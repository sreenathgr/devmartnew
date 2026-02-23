import { rh, rw } from '@/utils/responsiveScreenMeasures';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

type ConfirmPurchaseModalProps = {
  isVisible: boolean;
  setConfirmationModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const ConfirmPurchaseModal = ({
  isVisible,
  setConfirmationModalVisible,
}: ConfirmPurchaseModalProps) => {
  const router = useRouter();
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
            width: rw(80),
            height: rh(45),
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
                TOTAL AMOUNT
              </Text>
            </View>
            <View style={{ paddingStart: rw(3) }} />
            <View>
              <Text style={{ color: 'white', fontSize: 20 }}>$1,249.00</Text>
            </View>
          </View>
          <View style={{ paddingTop: rh(2) }}>
            <Pressable
              onPress={() => {
                setConfirmationModalVisible(false);
                router.replace('/(postAuth)/orderConfirm');
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
          </View>
          <View style={{ paddingTop: rh(2) }}>
            <Pressable
              onPress={() => setConfirmationModalVisible(false)}
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
