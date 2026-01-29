import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const Login = () => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.loginBackground }}>
      <View
        style={{
          backgroundColor: Colors.loginBackgroundSecondary,
          borderColor: Colors.acccentBlue,
          borderWidth: 1,
          marginTop: 10,
          marginHorizontal: 20,

          paddingBottom: '20%',
        }}
      >
        <View style={{ paddingTop: '30%', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontFamily: 'Manrope', fontSize: 30 }}>
            Welcome Back
          </Text>
        </View>
        <View style={{ paddingTop: '3%', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontFamily: 'Manrope', fontSize: 15 }}>
            Enter your details to access your account
          </Text>
        </View>
        <View
          style={{
            backgroundColor: Colors.charcoal,
            borderColor: Colors.acccentBlue,
            borderWidth: 1,
            marginTop: '3%',
            marginHorizontal: '8%',
            paddingBottom: '5%',
          }}
        >
          <View style={{ paddingTop: '10%', paddingStart: '10%' }}>
            <Text style={{ color: 'white', fontFamily: 'Manrope' }}>
              EMAIL ADDRESS
            </Text>
          </View>
          <View style={{ paddingHorizontal: '10%', paddingTop: '5%' }}>
            <TextInput
              style={{
                height: 50,
                backgroundColor: '#BDBDBD',
                borderRadius: 20,
                borderColor: Colors.acccentBlue,
                borderWidth: 0.5,
              }}
            />
          </View>
          <View style={{ paddingTop: '10%', paddingStart: '10%' }}>
            <Text style={{ color: 'white', fontFamily: 'Manrope' }}>
              PASSWORD
            </Text>
          </View>
          <View style={{ paddingHorizontal: '10%', paddingTop: '5%' }}>
            <TextInput
              style={{
                height: 50,
                backgroundColor: '#BDBDBD',
                borderRadius: 20,
                borderColor: Colors.acccentBlue,
                borderWidth: 0.5,
              }}
              secureTextEntry
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
