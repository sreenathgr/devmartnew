import { Colors } from '@/constants/Colors';
import { rh, rw } from '@/utils/responsiveScreenMeasures';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Register = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [toggleVisiblePassword, setToggleVisiblePassword] =
    useState<boolean>(false);
  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      >
        <ScrollView
          style={{ flexGrow: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps='handled'
        >
          <LinearGradient
            colors={['#1e1b4b', '#0B0E14']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1, paddingBottom: 50 }}
          >
            <View style={{ paddingHorizontal: rw(7) }}>
              <View style={{ paddingTop: insets.top }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 35,
                    fontFamily: 'Manrope',
                  }}
                >
                  Create Account
                </Text>
              </View>
              <View style={{ paddingTop: rh(1) }}>
                <Text style={{ color: '#7B8691', fontSize: 18 }}>
                  Join our exclusive community
                </Text>
              </View>
              <View style={{ paddingTop: rh(3) }}>
                <Text
                  style={{ color: '#7B8691', fontSize: 16, fontWeight: 'bold' }}
                >
                  FULL NAME
                </Text>
              </View>
              <View style={{ paddingTop: rh(2) }}>
                <TextInput
                  style={{
                    color: 'white',
                    borderWidth: 1,
                    fontSize: 17,
                    height: 70,
                    borderColor: Colors.acccentBlue,
                    backgroundColor: '#21262E',
                    paddingStart: rw(11),
                    borderRadius: 20,
                  }}
                  placeholder='John Doe'
                  placeholderTextColor={'#7B8691'}
                />
                <View
                  style={{ position: 'absolute', bottom: '36%', left: '5%' }}
                >
                  <Ionicons
                    name='person'
                    size={24}
                    color='#7B8691'
                  />
                </View>
              </View>
              <View style={{ paddingTop: rh(3) }}>
                <Text
                  style={{ color: '#7B8691', fontSize: 16, fontWeight: 'bold' }}
                >
                  EMAIL ADDRESS
                </Text>
              </View>
              <View style={{ paddingTop: rh(2) }}>
                <TextInput
                  style={{
                    color: 'white',
                    borderWidth: 1,
                    fontSize: 17,
                    height: 70,
                    borderColor: Colors.acccentBlue,
                    backgroundColor: '#21262E',
                    paddingStart: rw(11),
                    borderRadius: 20,
                  }}
                  placeholder='hello@aesthetic.com'
                  placeholderTextColor={'#7B8691'}
                />
                <View
                  style={{ position: 'absolute', bottom: '32%', left: '5%' }}
                >
                  <MaterialCommunityIcons
                    name='at'
                    size={24}
                    color='#7B8691'
                  />
                </View>
              </View>
              <View style={{ paddingTop: rh(3) }}>
                <Text
                  style={{ color: '#7B8691', fontSize: 16, fontWeight: 'bold' }}
                >
                  PASSWORD
                </Text>
              </View>
              <View style={{ paddingTop: rh(3) }}>
                <TextInput
                  maxLength={20}
                  style={{
                    color: 'white',
                    borderWidth: 1,
                    fontSize: 17,
                    height: 70,
                    borderColor: Colors.acccentBlue,
                    backgroundColor: '#21262E',
                    paddingStart: rw(11),
                    borderRadius: 20,
                  }}
                  secureTextEntry={toggleVisiblePassword}
                  placeholder='Enter Password'
                  placeholderTextColor={'#7B8691'}
                />
                <View
                  style={{ position: 'absolute', bottom: '36%', left: '5%' }}
                >
                  <MaterialCommunityIcons
                    name='lock'
                    size={26}
                    color='#7B8691'
                  />
                </View>
                <Pressable
                  onPress={() => {
                    setToggleVisiblePassword((prev) => !prev);
                  }}
                  style={({ pressed }) => [
                    {
                      position: 'absolute',
                      bottom: '33%',
                      right: '5%',
                      opacity: pressed ? 0.5 : 1,
                    },
                  ]}
                >
                  <AntDesign
                    name='eye'
                    size={24}
                    color='#7B8691'
                  />
                </Pressable>
              </View>
              <View style={{ paddingTop: rh(3) }}>
                <Text
                  style={{ color: '#7B8691', fontSize: 16, fontWeight: 'bold' }}
                >
                  CONFIRM PASSWORD
                </Text>
              </View>
              <View style={{ paddingTop: rh(2) }}>
                <TextInput
                  maxLength={20}
                  style={{
                    color: 'white',
                    borderWidth: 1,
                    fontSize: 17,
                    height: 70,
                    borderColor: Colors.acccentBlue,
                    backgroundColor: '#21262E',
                    paddingStart: rw(11),
                    borderRadius: 20,
                  }}
                  placeholder='Renter password'
                  placeholderTextColor={'#7B8691'}
                />
                <View
                  style={{ position: 'absolute', bottom: '36%', left: '5%' }}
                >
                  <MaterialCommunityIcons
                    name='lock'
                    size={26}
                    color='#7B8691'
                  />
                </View>
              </View>
              <View style={{ paddingTop: rh(5) }}>
                <Pressable
                  style={({ pressed }) => [
                    {
                      opacity: pressed ? 0.5 : 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#9F7AEA',
                      height: 70,
                      borderRadius: 20,
                      elevation: 20,
                      shadowColor: '#9F7AEA',
                      shadowOffset: { width: 20, height: 20 },
                    },
                  ]}
                >
                  <View>
                    <Text
                      style={{
                        color: 'white',
                        fontFamily: 'Manrope',
                        fontWeight: 'bold',
                        fontSize: 20,
                      }}
                    >
                      Create Account
                    </Text>
                  </View>
                  <View style={{ paddingStart: rw(3) }}>
                    <MaterialIcons
                      name='arrow-forward'
                      size={28}
                      color='white'
                    />
                  </View>
                </Pressable>
              </View>
              <Pressable
                onPress={() => {
                  router.replace('/(auth)/login');
                }}
                style={({ pressed }) => [
                  {
                    opacity: pressed ? 0.5 : 1,
                    alignItems: 'center',
                    paddingTop: rh(3),
                  },
                ]}
              >
                <Text
                  style={{
                    color: '#7B8691',
                    fontFamily: 'Manrope',
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}
                >
                  Already have an account?
                  <Text style={{ color: '#9F7AEA' }}> Log In</Text>
                </Text>
              </Pressable>
            </View>
          </LinearGradient>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({});
