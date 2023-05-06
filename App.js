import React, { useState, useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';

import MainScreen from "./src/Screens/MainScreen";

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <MainScreen />
    </ApplicationProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
