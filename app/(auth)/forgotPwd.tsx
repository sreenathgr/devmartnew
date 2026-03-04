import { Colors } from '@/constants/Colors';
import { emailRegex } from '@/utils/regex';
import { rh, rw } from '@/utils/responsiveScreenMeasures';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const ForgotPwd = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const auth = getAuth();
  const [isResetLinkButtonLoading, setResetLinkButtonLoading] =
    useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
  const [firebaseResetError, setFirebaseResetError] = useState<boolean>(false);
  const [firebaseResetErrorMessage, setFirebaseErrorMessage] =
    useState<string>('');

  const resetPassword = async () => {
    setFirebaseResetError(false);
    setFirebaseErrorMessage('');
    try {
      await sendPasswordResetEmail(auth, email);
      console.log('check your email for reset password link');
      ToastAndroid.show(
        'Password reset email sent! check your mail',
        ToastAndroid.SHORT,
      );
      setTimeout(() => {
        router.back();
      }, 2000);
    } catch (error: any) {
      console.log(error.message);
      setFirebaseResetError(true);
      setFirebaseErrorMessage(error.message);
    } finally {
      setResetLinkButtonLoading(false);
    }
  };

  const validateSubmit = () => {
    let isValidated = true;
    setEmailError(false);
    setEmailErrorMessage('');
    if (email.trim() === '') {
      isValidated = false;
      setEmailError(true);
      setEmailErrorMessage('please enter email');
    } else {
      isValidated = true;
      setEmailError(false);
      setEmailErrorMessage('');
      if (!emailRegex.test(email)) {
        isValidated = false;
        setEmailError(true);
        setEmailErrorMessage('please enter valid email');
      }
    }
    return isValidated;
  };
  return (
    <LinearGradient
      colors={['#1e1b4b', '#0B0E14']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={StyleSheet.absoluteFill}
    >
      <View style={{ flex: 1, paddingHorizontal: rw(5) }}>
        <Pressable
          onPress={() => {
            router.back();
          }}
          style={({ pressed }) => [
            { paddingTop: insets.top - rw(3), opacity: pressed ? 0.5 : 1 },
          ]}
        >
          <Entypo
            name='chevron-left'
            color={'white'}
            size={40}
          />
        </Pressable>
        <View style={{ paddingTop: rh(5) }}>
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 60,
              backgroundColor: '#FFFFFF1A',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              marginBottom: rh(5),
            }}
          >
            <MaterialCommunityIcons
              name='shield-lock'
              size={45}
              color='#7C3AED'
            />
          </View>
        </View>
        <View>
          <Text
            style={{
              color: 'white',
              fontSize: 25,
              fontFamily: 'Manrope',
              fontWeight: 'bold',
            }}
          >
            Reset Password
          </Text>
        </View>
        <View style={{ paddingTop: rh(1) }}>
          <Text style={{ color: '#7B8691', fontSize: 18 }}>
            Enter the email address associated with your account and we will
            send you a link to reset your password.
          </Text>
        </View>
        <View style={{ paddingTop: rh(3) }}>
          <Text style={{ color: '#7B8691', fontWeight: 'bold' }}>
            Email Address
          </Text>
        </View>
        <View style={{ paddingTop: rh(1) }}>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={{
              color: 'white',
              borderWidth: 1,
              fontSize: 17,
              height: 50,
              borderColor: emailError ? 'red' : Colors.acccentBlue,
              backgroundColor: '#21262E',
              paddingStart: rw(3),
              paddingEnd: rw(15),
              borderRadius: 18,
            }}
            placeholder='name@example.com'
            placeholderTextColor={'#7B8691'}
          />
          <View style={{ position: 'absolute', bottom: '32%', right: '5%' }}>
            <FontAwesome
              name='envelope'
              size={20}
              color='#7B8691'
            />
          </View>
        </View>
        {emailError && (
          <View style={{ paddingStart: rw(2) }}>
            <Text style={{ color: 'red' }}>{emailErrorMessage}</Text>
          </View>
        )}
        <View style={{ paddingTop: rh(5) }}>
          {!isResetLinkButtonLoading ? (
            <Pressable
              onPress={() => {
                if (validateSubmit()) {
                  setResetLinkButtonLoading(true);
                  resetPassword();
                }
              }}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.5 : 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#9F7AEA',
                  height: 58,
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
                  Send Reset Link
                </Text>
              </View>
              <View style={{ paddingStart: rw(3) }}>
                <MaterialCommunityIcons
                  name='play'
                  size={24}
                  color='white'
                />
              </View>
            </Pressable>
          ) : (
            <View>
              <ActivityIndicator
                size={30}
                color={'red'}
              />
            </View>
          )}
        </View>
        {firebaseResetError && (
          <View style={{ alignItems: 'center', paddingTop: rh(2) }}>
            <Text style={{ color: 'red' }}>{firebaseResetErrorMessage}</Text>
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

export default ForgotPwd;

const styles = StyleSheet.create({});
