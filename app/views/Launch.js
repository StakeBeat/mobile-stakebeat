import React, { Component } from 'react'
import { View } from 'react-native';
import { Image } from 'react-native-elements'

import { theme } from '../core/theme'
import Background from '../components/Background'
import Logo from '../components/Logo'

class Launch extends Component {
  render() {
    return (
      <Background style={{...theme.container, ...theme.center}}>
        <Logo width={140} height={140} />
      </Background>
    )
  }
}


export default Launch
