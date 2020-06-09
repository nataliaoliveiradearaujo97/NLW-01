import React from 'react';
import { AppLoading } from 'expo';
import { StatusBar } from 'react-native';
import { useFonts, Inter_700Bold, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';

import Routes from './src/routes';

export default function App() {
  const [fontsLoader] = useFonts({
    Inter_700Bold,
    Inter_400Regular,
    Inter_500Medium
  });

  if(!fontsLoader) {
    return <AppLoading />
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
        <Routes />
    </>
  );
};
