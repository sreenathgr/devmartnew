import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, View } from 'react-native';
const SplashScreen = () => {
  return <View style={styles.container}></View>;
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.splashbg,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
