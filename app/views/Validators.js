import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Keyboard, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import { Input, Text, Button, ListItem, Badge } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Swipeable from 'react-native-swipeable'

import Background from '../components/Background'
import { theme } from '../core/theme'
import { getValidators, addValidator, delValidator } from '../actions/validator'
import { setAuthUser } from '../actions/user'
import { digitValidator } from '../core/utils'
import Logo from '../components/Logo'


class Validators extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      index: '',
      indexError: '',
      isSwiping: false,
      currentOpenSwipe: null,
    }
    this.onDelValidator = this.onDelValidator.bind(this)
  }

  async componentDidMount() {
    if (Object.keys(this.props.currentUser).length == 0) {
      try {
        const accessToken = await AsyncStorage.getItem('@stakebeat_access_token')
        const username = await AsyncStorage.getItem('@stakebeat_username')
        this.props.setAuthUser({ username, accessToken })
        this.props.getValidators({ username, accessToken })
      } catch(e) {
        console.log('error: ', e)
      }
    } else {
      this.props.getValidators(this.props.currentUser)
    }
  }

  renderValidators() {
    return (
      <SafeAreaView style={styles.validatorList}>
        <ScrollView scrollEnabled={!this.state.isSwiping}>
          {
            this.props.validators.map((item, i) => (
              <Swipeable
                rightButtons={[
                  <TouchableOpacity
                    style={styles.swipeDel}
                    onPress={() => this.onDelValidator(item.indice, i)}>
                      <Text>Delete</Text>
                  </TouchableOpacity>
                ]}
                onRightButtonsOpenRelease = {(event, gestureState, swipe) => {
                  this.setState({ currentOpenSwipe: swipe })
                }}
                onSwipeStart={() => this.setState({isSwiping: true})}
                onSwipeRelease={() => this.setState({isSwiping: false})}
               key={i}
              >
                <ListItem key={i} bottomDivider containerStyle={{backgroundColor: 'none'}}>
                  <Badge
                    status="success"
                    value={i+1}
                    badgeStyle={{width: 30}}
                  />
                  <ListItem.Content>
                    <ListItem.Title>Validator #{item.indice}</ListItem.Title>
                    <ListItem.Subtitle style={{color: '#B5B5B5', fontStyle: 'italic'}}>{item.pubkey}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              </Swipeable>
            ))
          }
       </ScrollView>
      </SafeAreaView>
    )
  }

  onDelValidator(valIndex, position) {
      this.state.currentOpenSwipe.recenter()
      this.props.delValidator({ ...this.props.currentUser, ...{'index': valIndex, 'position': position}} )
  }

  onAddValidator() {
    Keyboard.dismiss()
    const indexError = digitValidator(this.state.index)
    if (indexError) {
      this.setState({ indexError })
    } else {
      this.setState({ indexError: '' })
      this.setState({ search: '' })
      this.props.addValidator({ ...this.props.currentUser, ...{'index': this.state.index}} )
    }
  }

  render() {
    return (
      <Background>
        <View style={{ ...theme.container, ...theme.hCenter}}>
          <View style={{ ...theme.maxWidth, ...theme.flex }}>
            <View style={styles.description}>
              <Text h4 h4Style={{color: theme.colors.secondary, marginBottom: 20, fontSize: 20}}>ADD YOUR VALIDATOR</Text>
              <Text>Track your validators balance and performance over time and get alerted when your node is down or having issues.</Text>
            </View>
            <View style={styles.inputBtnGroup}>
              <Input
                label='Validator Index'
                onChangeText={(index) => this.setState({ index })}
                errorMessage={this.state.indexError}
                containerStyle={{width: '80%'}}
                returnKeyType="done"
                onSubmitEditing={this.onAddValidator.bind(this)}
              />
              <Button
                icon={
                  <Icon
                    name="plus"
                    size={22}
                    color='white'
                  />
                }
                containerStyle={{width: '20%'}}
                buttonStyle={{backgroundColor: theme.colors.secondary}}
                onPress={this.onAddValidator.bind(this)}
              />
            </View>
          </View>
          {
            this.props.validators.length ? (
              <Text style={{marginTop: 30, fontSize: 16}}>Watch List</Text>
            ) : <></>
          }
          {this.renderValidators()}
          <View style={{...theme.flex, height: 80, marginTop: 40}}>
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
  inputBtnGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  description: {
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 50,
    marginTop: 100,
  },
  validatorList: {
    flex: 1,
    width: '100%',
    marginTop: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: theme.colors.primary,
    borderBottomColor: theme.colors.primary,
  },
  swipeDel: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    width: 75,
    justifyContent: 'center',
    backgroundColor: 'red',
  }
}

function mapStateToProps(state) {
  return { currentUser: state.user, validators: state.validators }
}

export default connect(mapStateToProps, { getValidators, setAuthUser, addValidator, delValidator })(Validators)
