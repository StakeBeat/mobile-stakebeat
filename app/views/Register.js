import React, {Component} from 'react'
import { connect } from 'react-redux'
import { View, TouchableOpacity} from 'react-native';
import { Button,Text, Input, Image } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome';

import { theme } from '../core/theme'
import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from '../core/utils';
import { register } from '../actions/user'
import Background from '../components/Background'
import Logo from '../components/Logo'

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      usernameError: '',
      password: '',
      passwordError: '',
      confirmationPassword: '',
    };
  }

  onRegister() {
    const usernameError = nameValidator(this.state.username);
    const passwordError = passwordValidator(this.state.password, this.state.confirmationPassword);

    if (usernameError || passwordError) {
      this.setState({ usernameError })
      this.setState({ passwordError })
    } else {
      this.props.register({ username: this.state.username, password: this.state.password })
        .then((isLogged) => {
          if (isLogged) {
            Actions.validatorGetStarted()
          } else {
            this.setState({usernameError: 'User Registration failed.'})
          }
        })
    }
  }

  render() {
    return (
      <Background>
        <View style={{ ...theme.container, ...theme.center, ...theme.maxWidth}}>
          <Logo  style={styles.logo} width={140} height={140} />
          <Input
            value={this.state.username}
            onChangeText={(username) => this.setState({ username })}
            placeholder={'Username'}
            returnKeyType="next"
            leftIcon={
              <Icon
                name='user'
                size={24}
                color={theme.colors.secondary} />
            }
            autoCapitalize="none"
            errorMessage={this.state.usernameError}
          />
          <Input
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            placeholder={'Password'}
            returnKeyType="next"
            secureTextEntry={true}
            leftIcon={
              <Icon
                name='lock'
                size={24}
                color={theme.colors.secondary} />
            }
          />
          <Input
            value={this.state.confirmationPassword}
            onChangeText={(confirmationPassword) => this.setState({ confirmationPassword })}
            placeholder={'Confirmation Password'}
            secureTextEntry={true}
            returnKeyType="done"
            leftIcon={
              <Icon
                name='lock'
                size={24}
                color={theme.colors.secondary} />
            }
            errorMessage={this.state.passwordError}
          />
          <Button
            title='Create an account'
            raised
            containerStyle={{width:'100%', marginTop:10}}
            buttonStyle={styles.loginButton}
            onPress={this.onRegister.bind(this)}
          />
          <TouchableOpacity onPress={() => Actions.login()} style={styles.signIn}>
            <Text h4 h4Style={{fontSize: 16}}>
               Have an account? Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </Background>
    )
  }
}

const styles = {
  loginButton: {
    borderRadius:20,
    backgroundColor: theme.colors.secondary,
  },
  logo: {
    marginBottom: 50,
  },
  forgotPw: {
    textAlign: 'right',
    width:'100%',
    marginTop: 20,
    fontStyle: 'italic',
  },
  signIn: {
    position: 'absolute',
    bottom: 60,
  }
}

export default connect(null, { register })(Register);
