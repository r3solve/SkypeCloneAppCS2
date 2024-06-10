import 'react-native-gesture-handler';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler'
import { StyleSheet, View, Text} from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Color from './constants/Color';
import SignInPage from './screens/SignInPage';
import GetStartedPage from './screens/GetStartedPage';
import CreateAccountPage from './screens/CreateAccountPage';
import SetUpAccountPage from './screens/SetUpAccountPage';
import HomePage from './screens/TabsPage';
import ChatDetailsPage from './screens/ChatDetails';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.appContainer}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='get-started'>
          <Stack.Group name='auth' screenOptions={{headerShown:false}}>
            <Stack.Screen name="login" component={SignInPage} />
            <Stack.Screen name='register' component={CreateAccountPage} />
            <Stack.Screen name='setup' component={SetUpAccountPage} />
            <Stack.Screen  name='get-started' component={GetStartedPage} />
          </Stack.Group>
        <Stack.Group name='home' screenOptions={{headerShown:false}} >
          <Stack.Screen name='home'  component={HomePage} ></Stack.Screen>
        </Stack.Group>
        <Stack.Group screenOptions={{headerStyle:{backgroundColor:Color.background_color},
         contentStyle:{
          backgroundColor:Color.background_color
        },title: ''
        
        }}>
          <Stack.Screen name='thread'  component={ChatDetailsPage}></Stack.Screen>
        </Stack.Group>


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
