import React from 'react';
import { Image } from 'react-native';

const Ethereum = (props) => (
  <Image source={require('../assets/ethereum.png')} style={{width: props.width, height: props.height}} />
)

export default Ethereum
