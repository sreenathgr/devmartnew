import { Colors } from '@/constants/Colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const Register = () => {
  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps='handled'
        >
          <LinearGradient
            colors={['#1e1b4b', '#0B0E14']}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={{ paddingHorizontal: '8%' }}>
              <View style={{ paddingTop: '15%' }}>
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
              <View style={{ paddingTop: '2%' }}>
                <Text style={{ color: '#7B8691', fontSize: 16 }}>
                  Join our exclusive community
                </Text>
              </View>
              <View style={{ paddingTop: '15%' }}>
                <Text
                  style={{ color: '#7B8691', fontSize: 16, fontWeight: 'bold' }}
                >
                  FULL NAME
                </Text>
              </View>
              <View style={{ paddingTop: '5%' }}>
                <TextInput
                  style={{
                    color: 'white',
                    borderWidth: 1,
                    fontSize: 17,
                    height: 70,
                    borderColor: Colors.acccentBlue,
                    backgroundColor: '#21262E',
                    paddingStart: '13%',
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
              <View style={{ paddingTop: '7%' }}>
                <Text
                  style={{ color: '#7B8691', fontSize: 16, fontWeight: 'bold' }}
                >
                  EMAIL ADDRESS
                </Text>
              </View>
              <View style={{ paddingTop: '5%' }}>
                <TextInput
                  style={{
                    color: 'white',
                    borderWidth: 1,
                    fontSize: 17,
                    height: 70,
                    borderColor: Colors.acccentBlue,
                    backgroundColor: '#21262E',
                    paddingStart: '13%',
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
              <View style={{ paddingTop: '7%' }}>
                <Text
                  style={{ color: '#7B8691', fontSize: 16, fontWeight: 'bold' }}
                >
                  PASSWORD
                </Text>
              </View>
              <View style={{ paddingTop: '5%' }}>
                <TextInput
                  maxLength={20}
                  style={{
                    color: 'white',
                    borderWidth: 1,
                    fontSize: 17,
                    height: 70,
                    borderColor: Colors.acccentBlue,
                    backgroundColor: '#21262E',
                    paddingStart: '13%',
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
                <View
                  style={{ position: 'absolute', bottom: '36%', right: '5%' }}
                >
                  <AntDesign
                    name='eye'
                    size={24}
                    color='#7B8691'
                  />
                </View>
              </View>
            </View>
          </LinearGradient>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({});
