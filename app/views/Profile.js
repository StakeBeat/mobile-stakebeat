import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Linking, View } from 'react-native'
import { Text, Avatar, ListItem, SocialIcon } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Actions } from 'react-native-router-flux'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { theme } from '../core/theme'
import Background from '../components/Background'
import NavBar from '../components/NavBar'
import { setAuthUser } from '../actions/user'

class Profile extends Component {

  onTwitterPress() {
    Linking.openURL('twitter://user?screen_name=stakebeat')
    .catch(() => {
      Linking.openURL('https://www.twitter.com/stakebeat');
    })
  }

  onContactPress() {
    Linking.openURL('mailto:contact@stakebeat.com')
  }

  async onSignOut() {
    try {
      await AsyncStorage.removeItem('@stakebeat_access_token')
      await AsyncStorage.removeItem('@stakebeat_username')
      this.props.setAuthUser({ username: '', accessToken: '' })
      Actions.login()
    } catch(e) {
      console.log("error logging out", e)
    }
  }

  render() {
    return (
      <Background>
        <NavBar />
        <View style={{...theme.container, flexDirection: 'column'}}>
          <View style={{...theme.hCenter, ...styles.avatarProfile}}>
            <Avatar
              rounded
              icon={{name: 'address-card', type: 'font-awesome'}}
              size={120}
            />
            <Text style={{fontSize: 20}}>{this.props.currentUser.username}</Text>
          </View>
          <View style={styles.profileList}>
            <ListItem
              bottomDivider
              containerStyle={{backgroundColor: 'none'}}
              onPress={() => Actions.validatorManage()}
            >
              <Icon name={'heartbeat'} size={24} color='#F06D43'/>
              <ListItem.Content>
                <ListItem.Title>Validator nodes</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>

            <ListItem
              bottomDivider
              containerStyle={{backgroundColor: 'none'}}
              onPress={this.onTwitterPress.bind(this)}
            >
              <Icon name={'twitter'} size={24} color='#43BDF0'/>
              <ListItem.Content>
                <ListItem.Title>Follow us on Twitter</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>

            <ListItem
              bottomDivider
              containerStyle={{backgroundColor: 'none'}}
              onPress={this.onContactPress.bind(this)}
            >
              <Icon name={'envelope'} size={24} color='#E1E1E1'/>
              <ListItem.Content>
                <ListItem.Title>Contact us</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>


            <ListItem
              bottomDivider
              containerStyle={{backgroundColor: 'none'}}
              onPress={this.onSignOut.bind(this)}
            >
              <Icon name={'sign-out'} size={24} color='#F04343'/>
              <ListItem.Content>
                <ListItem.Title>Sign Out</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </View>
        </View>
      </Background>

    )
  }
}

const styles = {
  profileList: {
    marginTop: 20,
  },
  avatarProfile: {
    backgroundColor: theme.colors.surface,
    paddingBottom: 20,
  }
}

function mapStateToProps(state) {
  return { currentUser: state.user }
}

export default connect(mapStateToProps, { setAuthUser })(Profile)
