import Ionicons from '@expo/vector-icons/Ionicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const TabLayout = () => {
  const TabGradient = () => {
    return (
      <LinearGradient
        colors={['#1e1b4b', '#0B0E14']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
    );
  };
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#9F7AEA',
        tabBarBackground: () => <TabGradient />,
        tabBarStyle: {
          height: 80,
          borderTopWidth: 0,
          backgroundColor: 'transparent',
          elevation: 0,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name='home'
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons
              name='home'
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name='cart'
        options={{
          title: 'Cart',
          tabBarIcon: ({ color }) => (
            <View>
              <SimpleLineIcons
                name='handbag'
                size={24}
                color={color}
              />
              <View style={{ position: 'absolute', right: 0 }}>
                <View
                  style={{
                    backgroundColor: 'purple',
                    width: 13,
                    height: 13,
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{ color: 'white', fontSize: 8, fontWeight: 'bold' }}
                  >
                    2
                  </Text>
                </View>
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <Ionicons
              name='person'
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='wishlist'
        options={{
          title: 'Wishlist',
          tabBarIcon: ({ color }) => (
            <Ionicons
              name='heart'
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;

const styles = StyleSheet.create({});
