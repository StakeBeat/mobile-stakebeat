import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { Text, Avatar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

import { theme } from '../core/theme'
import Background from '../components/Background'
import NavBar from '../components/NavBar'

class Profile extends Component {
  render() {
    return (
      <Background>
        <NavBar />
        <View style={{...theme.container, ...theme.maxWidth, flexDirection: 'column'}}>
          <View style={{...theme.hCenter}}>
            <Avatar
              rounded
              icon={{name: 'user-circle-o', type: 'font-awesome'}}
              size="xlarge"
            />
            <Text>{this.props.currentUser.username}</Text>
          </View>
        </View>
      </Background>

    )
  }
}

function mapStateToProps(state) {
  return { currentUser: state.user }
}

export default connect(mapStateToProps, {})(Profile)
