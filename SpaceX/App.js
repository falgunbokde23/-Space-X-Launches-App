import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { store } from "./redux/store"
import SpacexIndex from './screens/SpacexIndex';


export default function App() {

  return (
    <Provider store={store}>
    <SpacexIndex />
    </Provider>
  );
}

