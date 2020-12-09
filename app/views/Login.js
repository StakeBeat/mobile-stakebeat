import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, TouchableOpacity} from 'react-native';
import { Button,Text, Input, Image } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome';

import { login } from '../actions/user'
import { theme } from '../core/theme'
import Background from '../components/Background'
import Logo from '../components/Logo'

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      error: '',
    };
  }

  onLogin() {
    this.props.login({ username: this.state.username, password: this.state.password })
      .then((isLogged) => {
        if (isLogged) {
          // Redirect
          Actions.home()
          console.log("Logged")
        } else {
          this.setState({error: 'Invalid username or password'})
          // Show Alert
        }
      })
  }

  render() {
    return (
      <Background>
        <View style={{ ...theme.container, ...theme.center, ...theme.maxWidth}}>
          <Logo style={styles.logo} width={140} height={140}/>
          <Input
            value={this.state.username}
            onChangeText={(username) => this.setState({ username })}
            placeholder={'Username'}
            leftIcon={
              <Icon
                name='user'
                size={24}
                color={theme.colors.secondary} />
            }
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => { this.secondTextInput.focus(); }}
            blurOnSubmit={false}
          />
          <Input
            ref={(input) => { this.secondTextInput = input; }}
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            placeholder={'Password'}
            returnKeyType="done"
            secureTextEntry={true}
            leftIcon={
              <Icon
                name='lock'
                size={24}
                color={theme.colors.secondary} />
            }
            errorMessage={this.state.error}
          />
          <Button
            title='Sign In'
            raised
            containerStyle={{width:'100%', marginTop:10}}
            buttonStyle={styles.loginButton}
            onPress={this.onLogin.bind(this)}
          />
          <TouchableOpacity onPress={() => Actions.register()} style={styles.register}>
            <Text h4 h4Style={{fontSize: 16}}>
                Register a new account
            </Text>
          </TouchableOpacity>
        </View>
      </Background>
    );
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
  register: {
    position: 'absolute',
    bottom: 70,
  }
}

export default connect(null, { login })(Login);
