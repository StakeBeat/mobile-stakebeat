import React, { Component } from 'react'
import { View } from 'react-native'

import Logo from './Logo'

class NavBar extends Component {
  render() {
    return (
      <View style={styles.navBar}>
        <Logo width={50} height={50} />
      </View>
    )
  }
}


const styles = {
  navBar: {
    width: '100%',
    marginTop: 30,
    height: 50,
    alignItems: 'center',
    borderBottomWidth: 1,
  }
}

export default NavBar
