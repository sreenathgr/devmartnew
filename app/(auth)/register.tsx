import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const Register = () => {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        // 1. Colors go from slightly more opaque to more transparent
        colors={['#1e1b4b', '#1e1b4b']}
        // 2. Adjust the angle (Top-Left to Bottom-Right is common for glass)
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      ></LinearGradient>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({});
