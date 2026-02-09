import HomeDrawerContent from '@/components/HomeDrawerContent/HomeDrawerContent';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const HomeDrawerLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <HomeDrawerContent {...props} />}
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#0B0E14',
            width: 250,
          },
          drawerActiveTintColor: '#9F7AEA',
          drawerInactiveTintColor: 'white',
          headerShown: false, // This shows the "Hamburger" menu icon
          headerStyle: { backgroundColor: '#0B0E14' },
          headerTintColor: 'white',
        }}
      ></Drawer>
    </GestureHandlerRootView>
  );
};

export default HomeDrawerLayout;

const styles = StyleSheet.create({});
