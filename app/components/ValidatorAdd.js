import React, { Component } from 'react'

import { connect } from 'react-redux'
import { View, Keyboard } from 'react-native'
import { Input, Text, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

import { theme } from '../core/theme'
import { addValidator } from '../actions/validator'
import { setAuthUser } from '../actions/user'
import { digitValidator } from '../core/utils'

class ValidatorAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      index: '',
      indexError: '',
    }
  }

  onAddValidator() {
    Keyboard.dismiss()
    const indexError = digitValidator(this.state.index)
    if (indexError) {
      this.setState({ indexError })
    } else {
      this.setState({ indexError: '' })
      this.props.addValidator({ ...this.props.currentUser, ...{'index': this.state.index}} )
      this.setState({ index: '' })
    }
  }

  render() {
    return (
      <View style={{...styles.inputBtnGroup, ...theme.maxWidth }}>
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
              color={theme.colors.secondary}
            />
          }
          containerStyle={{width: '15%'}}
          buttonStyle={{backgroundColor: theme.colors.primary}}
          onPress={this.onAddValidator.bind(this)}
        />
      </View>
    )
  }
}


const styles = {
  inputBtnGroup: {
    marginTop: 20,
    flexShrink:5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}

function mapStateToProps(state) {
  return { currentUser: state.user }
}


export default connect(mapStateToProps, { addValidator })(ValidatorAdd)
