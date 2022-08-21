/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from './src/redux/store'
import { Provider } from 'react-redux'
import Navigation from './src/components/navigation/Navigation'
import { AuthProvider } from './src/context/AuthContext';
import './src/components/nfc/AppOutlets'

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <StatusBar barStyle="light-content" backgroundColor= '#011630'/>
        <SafeAreaProvider style={styles.container}>
          <Navigation />
        </SafeAreaProvider>
      </AuthProvider>
    </Provider>
  
  ); 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: 'IndustryInc-Detail',
    fontStyle: Platform.OS === 'ios' ? 'italic' : 'normal',
  },
});

export default App;
