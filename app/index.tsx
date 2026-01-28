import Logo from '@/assets/images/logo.svg';
import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Splash = () => {
  return (
    <View style={styles.container}>
      <Logo
        width={180}
        height={180}
      />
      <Text style={{ color: 'white', fontSize: 30 }}>SHOP EASE</Text>
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
