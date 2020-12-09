import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = (props) => (
  <Image
    source={require('../assets/logo.png')}
    style={{width: props.width, height: props.height}}
  />
)


export default Logo
