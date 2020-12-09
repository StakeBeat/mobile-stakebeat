import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'
import { View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { ListItem, Text } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { theme } from '../core/theme'
import Background from '../components/Background'
import NavBar from '../components/NavBar'
import { editUser } from '../actions/user'

class NotificationGetStarted extends Component {
  constructor(props) {
    super(props)

    this.state = {
      notificationEnabled: true,
    }
  }

  render() {
    return (
      <Background >
        <NavBar />
        <View style={{ ...theme.container, ...theme.hCenter, ...theme.maxWidth, flexDirection: 'column', justifyContent: 'flex-start'}}>

          <View style={styles.description}>
            <Text style={{color: theme.colors.secondary, marginBottom: 20, fontSize: 24}}>Get notified immediately</Text>
            <Text style={{fontSize: 14}}>Increase your node up-time and performance by receiving notifications on your smartphone immediately.</Text>
          </View>
          {this.renderNotificationCheckbox()}
          {this.renderNotificationList()}
          <View style={{height: 60, marginTop: 30, bottom: 0, position: 'relative'}}>
            <TouchableOpacity onPress={this.onGetStarted.bind(this)}>
              <Text style={{ fontSize: 19, color: theme.colors.third }}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Background>
    )
  }

  async onNotifToggle() {
    await this.setState({ notificationEnabled: !this.state.notificationEnabled })
  }

  renderNotificationCheckbox() {
    return (
      <ListItem
        containerStyle={{backgroundColor: 'none', width: "100%", marginTop: 30, borderTopWidth: 1, borderBottomWidth: 1, borderColor: theme.colors.primary, flexShrink: 3}}

      >
        <ListItem.Content>
          <ListItem.Title>Receive push notifications</ListItem.Title>
        </ListItem.Content>
        <ListItem.CheckBox
          checked={this.state.notificationEnabled}
          onPress={this.onNotifToggle.bind(this)}
        />
      </ListItem>
    )
  }

  async onGetStarted() {
    try {
      const accessToken = await AsyncStorage.getItem('@stakebeat_access_token')
      let expoToken = {data: ''}
      if (this.state.notificationEnabled) {
        const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        if (!permission.granted) return;
        expoToken = await Notifications.getExpoPushTokenAsync();
      }
      const payload = {
        accessToken: accessToken,
        expoToken: expoToken.data,
        notificationEnabled: this.state.notificationEnabled
      }
      this.props.editUser(payload)
      Actions.home()
    } catch (error) {
      console.log('Error getting a token', error);
    }
  }

  renderNotificationList() {
    return (
      <SafeAreaView style={{ width: '100%', marginTop: 30, flexShrink: 5 }}>
        <Text style={{fontSize: 18}}>Get notified when :</Text>
        <ScrollView>
          <ListItem
            containerStyle={{backgroundColor: 'none'}}
          >
            <Icon name={'check'} color="green" />
            <ListItem.Content>
              <ListItem.Title>You missed an attestation</ListItem.Title>
            </ListItem.Content>
          </ListItem>

          <ListItem
            containerStyle={{backgroundColor: 'none'}}
          >
            <Icon name={'check'} color="green" />
            <ListItem.Content>
              <ListItem.Title>You missed a block proposal</ListItem.Title>
            </ListItem.Content>
          </ListItem>

          <ListItem
            containerStyle={{backgroundColor: 'none'}}
          >
            <Icon name={'check'} color="green" />
            <ListItem.Content>
              <ListItem.Title>Your effectiveness is bad</ListItem.Title>
            </ListItem.Content>
          </ListItem>

          <ListItem
            containerStyle={{backgroundColor: 'none'}}
          >
            <Icon name={'check'} color="green" />
            <ListItem.Content>
              <ListItem.Title>You have been slashed</ListItem.Title>
            </ListItem.Content>
          </ListItem>

          <ListItem
            containerStyle={{backgroundColor: 'none'}}
          >
            <Icon name={'check'} color="green" />
            <ListItem.Content>
              <ListItem.Title>You proposed a block</ListItem.Title>
            </ListItem.Content>
          </ListItem>

         </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = {
  description: {
    alignItems: 'center',
    textAlign: 'center',
    flexShrink: 0,
    marginTop: 20,
    marginBottom: 10,
  },
}

export default connect(null, { editUser })(NotificationGetStarted)
