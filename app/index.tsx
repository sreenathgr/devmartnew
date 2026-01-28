import Logo from '@/assets/images/logo.svg';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Splash = () => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = setTimeout(() => {
      router.replace('/(auth)/onboarding');
    }, 3000);

    return () => clearTimeout(unsubscribe);
  }, []);
  return (
    <View style={styles.container}>
      <Logo
        width={180}
        height={180}
      />
      <Text style={{ color: 'white', fontSize: 30, fontFamily: 'Manrope' }}>
        SHOP EASE
      </Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.splashbg,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
