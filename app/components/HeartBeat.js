import React from 'react';
import { Image } from 'react-native';

const HeartBeat = (props) => (
  <Image source={require('../assets/kapture_2017-03-20_at_15.27.01.gif')} style={{width: props.width, height: props.height}} />
)

export default HeartBeat
