import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import { Colors } from '../../constants/Colors';

const Onboarding = () => {
  const pagerRef = useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const onPageSelected = (e: any) => {
    setCurrentPage(e.nativeEvent.position);
  };
  return (
    <View style={{ flex: 1, backgroundColor: Colors.onboardingBackground }}>
      <View
        style={{ paddingTop: '10%', paddingEnd: '10%', alignSelf: 'flex-end' }}
      >
        <Text
          style={{
            color: Colors.backgroundLight,
            fontFamily: 'NewsReader',
            fontSize: 16,
          }}
        >
          SKIP
        </Text>
      </View>
      <View style={{ paddingTop: '10%' }}>
        <PagerView
          style={{ width: '100%', height: '80%', backgroundColor: 'red' }}
          initialPage={0}
        >
          <View
            key='1'
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text style={{ color: 'white' }}>Welcome to DevMart</Text>
          </View>
          <View key='2'>
            <Text style={{ color: 'white' }}>Fast Delivery</Text>
          </View>
          <View key='3'>
            <Text style={{ color: 'white' }}>Premium Quality</Text>
          </View>
        </PagerView>
        <View style={{ position: 'absolute', bottom: 50 }}>
          <Text style={{ color: 'white' }}>Page:{currentPage + 1} of 3</Text>
        </View>
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({});
