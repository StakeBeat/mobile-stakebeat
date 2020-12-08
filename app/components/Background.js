import React, { memo } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'


import { theme } from '../core/theme';

const Background = ({ children }) => (
  <LinearGradient colors={['#221e38', '#2d2d58', '#414180']} style={styles.background}>
    <KeyboardAvoidingView style={styles.container}>
      {children}
    </KeyboardAvoidingView>
  </LinearGradient>
);

const styles = {
  background: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
}

export default memo(Background);
