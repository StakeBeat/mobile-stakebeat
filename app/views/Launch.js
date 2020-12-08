import React, { Component } from 'react'
import { View } from 'react-native';
import { Image } from 'react-native-elements'

import { theme } from '../core/theme'
import Background from '../components/Background'
import Logo from '../components/Logo'

class Launch extends Component {
  render() {
    return (
      <Background>
        <Logo />
      </Background>
    )
  }
}


export default Launch
