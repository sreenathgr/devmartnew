import { auth } from '@/config/firebase/firebaseConfig';
import { Colors } from '@/constants/Colors';
import { emailRegex } from '@/utils/regex';
import { rh, rw } from '@/utils/responsiveScreenMeasures';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Login = (props: any) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');
  const [loginError, setLoginError] = useState<boolean>(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState<string>('');

  const validateSubmit = () => {
    let is_validated = true;
    setEmailError(false);
    setEmailErrorMessage('');
    setPasswordError(false);
    setPasswordErrorMessage('');

    if (email.trim().length === 0) {
      setEmailError(true);
      setEmailErrorMessage('Enter an email');
      is_validated = false;
    } else if (!emailRegex.test(email.trim())) {
      setEmailError(true);
      setEmailErrorMessage('Enter a valid email');
      is_validated = false;
    }

    if (password.trim().length === 0) {
      setPasswordError(true);
      setPasswordErrorMessage('Enter a password');
      is_validated = false;
    }
    if (password.trim().length < 8) {
      setPasswordError(true);
      setPasswordErrorMessage('Minimum password length is 8');
      is_validated = false;
    }
    return is_validated;
  };
  const classifyLoginError = (error: any) => {
    if (error === 'Firebase: Error (auth/invalid-credential).') {
      setLoginError(true);
      setLoginErrorMessage('Invalid username or password');
    } else {
      setLoginError(true);
      setLoginErrorMessage(error);
    }
  };
  const handleLogin = async () => {
    setLoginError(false);
    setLoginErrorMessage('');
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      console.log('logged in', user.email);
    } catch (error: any) {
      classifyLoginError(error.message);
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
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      >
        <View
          style={[styles.outerDivContainer, { marginTop: insets.top - rw(3) }]}
        >
          <View style={styles.welcomeBackTextView}>
            <Text style={styles.welcomeBackText}>Welcome Back</Text>
          </View>
          <View style={styles.enterDetailsTextView}>
            <Text style={styles.enterDetailsText}>
              Enter your details to access your account
            </Text>
          </View>
          <View style={styles.innerDivContainer}>
            <View style={styles.emailAddressView}>
              <Text style={styles.emailAddressText}>EMAIL ADDRESS</Text>
            </View>
            <View style={styles.emailAddressTextInputView}>
              <TextInput
                style={[
                  styles.emailAddressTextInputStyle,
                  { borderColor: emailError ? 'red' : Colors.acccentBlue },
                ]}
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            {emailError && (
              <View style={{ alignItems: 'center', paddingTop: rh(1) }}>
                <Text style={{ color: 'red' }}>{emailErrorMessage}</Text>
              </View>
            )}
            <View style={styles.passwordTextView}>
              <Text style={styles.passwordText}>PASSWORD</Text>
            </View>
            <View style={styles.passwordTextInputView}>
              <TextInput
                style={[
                  styles.passwordTextInputStyle,
                  { borderColor: passwordError ? 'red' : Colors.acccentBlue },
                ]}
                secureTextEntry={!isPasswordVisible}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
              <View style={styles.eyeIconAbsoluteView}>
                <Pressable
                  style={({ pressed }) => [
                    {
                      opacity: pressed ? 0.5 : 1,
                    },
                  ]}
                  onPress={() => {
                    setPasswordVisible((prev) => !prev);
                  }}
                >
                  <AntDesign
                    name='eye'
                    size={24}
                    color='#7B8691'
                  />
                </Pressable>
              </View>
            </View>
            {passwordError && (
              <View style={{ alignItems: 'center', paddingTop: rh(1) }}>
                <Text style={{ color: 'red' }}>{passwordErrorMessage}</Text>
              </View>
            )}
            <View style={styles.loginButtonView}>
              <Pressable
                onPress={() => {
                  if (validateSubmit()) {
                    handleLogin();
                  }
                }}
                style={({ pressed }) => [
                  {
                    opacity: pressed ? 0.5 : 1,
                  },
                  styles.loginButtonStyle,
                ]}
              >
                <Text style={styles.loginButtonTextStyle}>Log In</Text>
              </Pressable>
            </View>
            {loginError && (
              <View style={{ alignItems: 'center', paddingTop: rh(2) }}>
                <Text style={{ color: 'red', fontSize: 15 }}>
                  {loginErrorMessage}
                </Text>
              </View>
            )}
            <Pressable
              onPress={() => {
                router.push('/(auth)/forgotPwd');
              }}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.5 : 1,
                },
                styles.forgotPasswordTextView,
              ]}
            >
              <Text style={styles.forgotPasswordText}>FORGOT PASSWORD?</Text>
            </Pressable>
          </View>
          <Pressable
            onPress={() => {
              router.replace('/(auth)/register');
            }}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.5 : 1,
              },
              styles.createAccountButton,
            ]}
          >
            <Text style={styles.newHereText}>
              New here?{' '}
              <Text style={styles.createAccountText}> Create Account</Text>
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  createAccountText: { color: 'white' },
  newHereText: { color: '#7B8691', fontSize: 18 },
  createAccountButton: {
    alignItems: 'center',
    paddingTop: rh(5),
  },
  forgotPasswordText: { color: '#7B8691' },
  forgotPasswordTextView: {
    alignItems: 'center',
    paddingTop: rh(2),
  },
  loginButtonTextStyle: {
    fontSize: 15,
    fontFamily: 'Manrope',
    fontWeight: 'bold',
  },
  loginButtonStyle: {
    backgroundColor: '#FFFFFF',
    height: 50,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 20,
  },
  loginButtonView: { paddingHorizontal: rw(7), paddingTop: rh(3) },
  eyeIconAbsoluteView: { position: 'absolute', left: '95%', bottom: '25%' },
  passwordTextInputStyle: {
    height: 50,
    backgroundColor: '#21262E',
    borderRadius: 20,
    paddingEnd: rw(10),
    paddingStart: rw(3),
    borderWidth: 0.5,
    color: '#7B8691',
    fontSize: 15,
  },
  passwordTextInputView: { paddingHorizontal: rw(7), paddingTop: rh(2) },
  passwordText: { color: 'white', fontFamily: 'Manrope' },
  passwordTextView: { paddingTop: rh(3), paddingStart: rw(7) },
  emailAddressTextInputStyle: {
    height: 50,
    backgroundColor: '#21262E',
    borderRadius: 20,
    paddingStart: rw(3),
    borderWidth: 0.5,
    color: '#7B8691',
    fontSize: 15,
  },
  emailAddressTextInputView: { paddingHorizontal: rw(7), paddingTop: rh(2) },
  emailAddressText: { color: 'white', fontFamily: 'Manrope' },
  emailAddressView: { paddingTop: rh(5), paddingStart: rw(7) },
  innerDivContainer: {
    backgroundColor: '#FFFFFF1A',
    borderColor: Colors.acccentBlue,
    borderWidth: 0.5,
    marginTop: rh(5),
    marginHorizontal: rw(10),
    paddingBottom: rh(2),
    borderRadius: 20,
    shadowColor: Colors.loginBackground,
    shadowRadius: 30,
    shadowOffset: { width: 20, height: 20 },
  },
  enterDetailsText: { color: 'white', fontFamily: 'Manrope', fontSize: 15 },
  enterDetailsTextView: { paddingTop: rh(2), alignItems: 'center' },
  welcomeBackText: { color: 'white', fontFamily: 'Manrope', fontSize: 30 },
  welcomeBackTextView: { paddingTop: rh(12), alignItems: 'center' },
  outerDivContainer: {
    backgroundColor: Colors.loginBackgroundSecondary,
    borderColor: Colors.acccentBlue,
    borderWidth: 0.5,

    marginHorizontal: 20,
    borderRadius: 20,
    paddingBottom: rh(14),
  },
  container: { flex: 1, backgroundColor: Colors.loginBackground },
});
