import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
SplashScreen.preventAutoHideAsync();
export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Manrope: require('@/assets/fonts/Manrope-VariableFont_wght.ttf'),
    NewsReader: require('@/assets/fonts/Newsreader-VariableFont_opsz,wght.ttf'),
  });

  useEffect(() => {
    // If there is an error, we still want to hide the splash
    // so we can see the error message on the screen!
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  // If fonts aren't loaded and there's no error yet, stay blank
  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='index' />
        <Stack.Screen name='(postAuth)/(tabs)' />
      </Stack>
      <StatusBar style='auto' />
    </SafeAreaView>
  );
}
