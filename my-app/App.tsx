import React from 'react';
import { AppLoading } from 'expo';
import { StatusBar } from 'react-native';
import { useFonts, Inter_700Bold, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
// import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
// import { Ubuntu_700Bold} from '@expo-google-fonts/ubuntu';
// import { useFonts } from '@use-expo/font';

import Routes from './src/routes';

export default function App() {
  const [fontsLoader] = useFonts({
    Inter_700Bold,
    Inter_400Regular,
    Inter_500Medium
    // Roboto_400Regular,
    // Roboto_500Medium,
    // Ubuntu_700Bold
  });

  // if(!fontsLoader) {
  //   return <AppLoading />
  // }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
        <Routes />
    </>
  );
};
