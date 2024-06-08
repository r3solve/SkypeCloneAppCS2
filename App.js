import 'react-native-gesture-handler';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler'
import { StyleSheet, View, Text} from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FeedPage from './screens/TabsPage';
import HomePage from './screens/SignInPage';
import ChatDetailsPage from './screens/ChatDetails';
import Color from './constants/Color';
import SignInPage from './screens/SignInPage';
import GetStartedPage from './screens/GetStartedPage';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.appContainer}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='get-started'>
          <Stack.Screen options={{headerShown:false}} name='get-started' component={GetStartedPage} />
          <Stack.Screen options={{headerShown:false}} name="Feed" component={FeedPage} />
          <Stack.Screen name="Home" options={{headerShown:false}} component={HomePage} />
          <Stack.Screen name="Thread"  options={{headerStyle :{ backgroundColor: Color.primary_color}}} component={HomePage}  />
          <Stack.Screen name="login" options={{headerShown:false}} component={SignInPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#EDF7FF'
  },
});
