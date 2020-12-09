import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'

import Background from '../components/Background'
import { theme } from '../core/theme'
import NavBar from '../components/NavBar'
import ValidatorAdd from '../components/ValidatorAdd'
import ValidatorList from '../components/ValidatorList'
import { maxAppWidth } from '../core/size'


class ValidatorGetStarted extends Component {
  render() {
    return (
      <Background>
        <NavBar />
        <View style={{ ...theme.container, ...theme.hCenter, flexDirection: 'column', justifyContent: 'space-around'}}>

          <View style={styles.description}>
            <Text style={{color: theme.colors.secondary, marginBottom: 20, fontSize: 24}}>Monitor your nodes</Text>
            <Text>Start monitoring your validator's balance and performance and get notified when your node is down or having issues.</Text>
          </View>
          <ValidatorAdd />
          <ValidatorList />

          <View style={{height: 60, marginTop: 30}}>

            <TouchableOpacity onPress={() => Actions.home()}>
              <Text style={{ fontSize: 16, color: theme.colors.third }}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Background>
    )
  }
}

const styles = {
  description: {
    width: maxAppWidth,
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
}

export default ValidatorGetStarted
