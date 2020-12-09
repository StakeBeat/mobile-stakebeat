import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Keyboard, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import { Text, ListItem, Badge } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Swipeable from 'react-native-swipeable'

import { theme } from '../core/theme'
import { getValidators, delValidator } from '../actions/validator'
import { setAuthUser } from '../actions/user'

class ValidatorList extends Component {
  constructor(props) {
    super(props)

    this.state = {
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


  render() {
    return (
      <View style={styles.validatorList}>
        {this.renderValidators()}
      </View>
    )
  }

  renderValidators() {
    return (
      <SafeAreaView>
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
}

const styles = {
  validatorList: {
    flexShrink: 5,
    width: "100%",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: theme.colors.primary,
    borderBottomColor: theme.colors.primary,
  },
  swipeDel: {
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

export default connect(mapStateToProps, { getValidators, setAuthUser, delValidator })(ValidatorList)
