import { auth, db } from '@/config/firebase/firebaseConfig';
import { Colors } from '@/constants/Colors';
import { emailRegex } from '@/utils/regex';
import { rh, rw } from '@/utils/responsiveScreenMeasures';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

import React, { useEffect, useState } from 'react';
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
    useState<boolean>(true);
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [reEnterPassword, setReEnterPassword] = useState<string>('');
  const [fullNameError, setFullNameError] = useState<boolean>(false);
  const [fullNameErrorMessage, setFullNameErrorMessage] = useState<string>('');
  const [emailAddressError, setEmailAddressError] = useState<boolean>(false);
  const [emailAddressErrorMessage, setEmailAddressErrorMessage] =
    useState<string>('');
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] =
    useState<boolean>(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState<string>('');

  const onSubmitValidation = () => {
    let isValidated = true;

    setFullNameError(false);
    setFullNameErrorMessage('');
    setEmailAddressError(false);
    setEmailAddressErrorMessage('');
    setPasswordError(false);
    setPasswordErrorMessage('');
    setConfirmPasswordError(false);
    setConfirmPasswordErrorMessage('');

    if (fullName.trim().length === 0) {
      setFullNameError(true);
      setFullNameErrorMessage('Full name should not be empty');
      isValidated = false;
    }

    if (email.trim().length === 0) {
      setEmailAddressError(true);
      setEmailAddressErrorMessage('email should not be empty');
      isValidated = false;
    } else if (!emailRegex.test(email.trim())) {
      setEmailAddressError(true);
      setEmailAddressErrorMessage('enter valid email');
      isValidated = false;
    }

    if (password.trim().length === 0) {
      setPasswordError(true);
      setPasswordErrorMessage('Password should not be empty');
      isValidated = false;
    } else if (password.trim().length < 8) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 8 characters');
      isValidated = false;
    }
    if (reEnterPassword.trim().length === 0) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage('confirm password should not be empty');
      isValidated = false;
    } else if (password.trim() !== reEnterPassword.trim()) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage('passwords not match');
      isValidated = false;
    }
    return isValidated;
  };

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        fullName: fullName,
        createdAt: serverTimestamp(),
      });
      console.log('user registered', user.email);
    } catch (error: any) {
      console.log('Sign up error', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace('/(postAuth)/(drawer)/(tabs)/home');
      }
    });
    return () => unsubscribe();
  }, []);
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
                    borderColor: fullNameError ? 'red' : Colors.acccentBlue,
                    backgroundColor: '#21262E',
                    paddingStart: rw(11),
                    borderRadius: 20,
                  }}
                  value={fullName}
                  onChangeText={(text) => {
                    setFullName(text);
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
              {fullNameError && (
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ color: 'red' }}>{fullNameErrorMessage}</Text>
                </View>
              )}
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
                    borderColor: emailAddressError ? 'red' : Colors.acccentBlue,
                    backgroundColor: '#21262E',
                    paddingStart: rw(11),
                    borderRadius: 20,
                  }}
                  value={email}
                  onChangeText={(text) => setEmail(text)}
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
              {emailAddressError && (
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ color: 'red' }}>
                    {emailAddressErrorMessage}
                  </Text>
                </View>
              )}
              <View style={{ paddingTop: rh(3) }}>
                <Text
                  style={{ color: '#7B8691', fontSize: 16, fontWeight: 'bold' }}
                >
                  PASSWORD
                </Text>
              </View>
              <View style={{ paddingTop: rh(3) }}>
                <TextInput
                  style={{
                    color: 'white',
                    borderWidth: 1,
                    fontSize: 17,
                    height: 70,
                    borderColor: passwordError ? 'red' : Colors.acccentBlue,
                    backgroundColor: '#21262E',

                    paddingHorizontal: rw(11),
                    borderRadius: 20,
                  }}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
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
              {passwordError && (
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ color: 'red' }}>{passwordErrorMessage}</Text>
                </View>
              )}
              <View style={{ paddingTop: rh(3) }}>
                <Text
                  style={{ color: '#7B8691', fontSize: 16, fontWeight: 'bold' }}
                >
                  CONFIRM PASSWORD
                </Text>
              </View>
              <View style={{ paddingTop: rh(2) }}>
                <TextInput
                  style={{
                    color: 'white',
                    borderWidth: 1,
                    fontSize: 17,
                    height: 70,
                    borderColor: confirmPasswordError
                      ? 'red'
                      : Colors.acccentBlue,
                    backgroundColor: '#21262E',
                    paddingStart: rw(11),
                    borderRadius: 20,
                  }}
                  secureTextEntry
                  value={reEnterPassword}
                  onChangeText={(text) => setReEnterPassword(text)}
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
              {confirmPasswordError && (
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ color: 'red' }}>
                    {confirmPasswordErrorMessage}
                  </Text>
                </View>
              )}
              <View style={{ paddingTop: rh(5) }}>
                <Pressable
                  onPress={() => {
                    if (onSubmitValidation()) {
                      handleSignUp();
                    }
                  }}
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
