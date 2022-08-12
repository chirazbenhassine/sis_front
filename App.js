/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StatusBar } from 'react-native';
import Navigation from './src/components/navigation/Navigation'
import { AuthProvider } from './src/context/AuthContext';
import './src/components/nfc/AppOutlets'

const App = () => {
  return (
    <AuthProvider>
      <StatusBar backgroundColor = "red" />
      <Navigation />
    </AuthProvider>
  
  ); 
};


export default App;
