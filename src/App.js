import React, { useCallback } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as ExpoSplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import InitialSplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import OnboardingElements from './screens/OnboardingElements';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import VerificationScreen from './screens/auth/VerificationScreen';
import { AuthProvider } from './context/AuthContext';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'ClanPro-Bold': require('./assets/fonts/ClanPro-Bold.ttf'),
    'ClanPro-Medium': require('./assets/fonts/ClanPro-Medium.ttf'),
    'ClanPro-Book': require('./assets/fonts/ClanPro-Book.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await ExpoSplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName="Splash"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Splash" component={InitialSplashScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="OnboardingElements" component={OnboardingElements} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Verification" component={VerificationScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </AuthProvider>
  );
} 