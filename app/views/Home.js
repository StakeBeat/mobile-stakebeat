import React, {Component} from 'react'

import { View , Text} from 'react-native'

import Background from '../components/Background'

class Home extends Component {
  render() {
    return (
      <Background>
        <View>
          <Text>
            Bienvenue Home!!
          </Text>
        </View>
      </Background>
    )
  }
}

export default Home
