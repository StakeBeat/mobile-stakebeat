import React, { Component } from 'react';
import { Provider } from 'react-redux';
import promise from 'redux-promise'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {
  Scene,
  Router,
  Stack,
} from 'react-native-router-flux';
import { ThemeProvider } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from './views/Login';
import Register from './views/Register';
import Home from './views/Home';
import Validators from './views/Validators';
import Launch from './views/Launch';
import reducers from './reducers/root_reducer'

const createStoreWithMiddleware = applyMiddleware(promise, thunk)(createStore)
const store = createStoreWithMiddleware(reducers)

class App extends Component {
  state = {
    username: '',
    accessToken: ''
  }

  async componentDidMount() {
    try {
      const accessToken = await AsyncStorage.getItem('@stakebeat_access_token')
      if (accessToken) {
        this.setState({accessToken})
      }
      const username = await AsyncStorage.getItem('@stakebeat_username')
      if (username) {
        this.setState({username})
      }
    } catch(e) {
      console.log('error: ', e)
    }
  }

// HELPER FUNCTION FOR AUTH
  authenticate = () => {
    const isAuth = (this.state.username && this.state.accessToken) ? true : false
    return isAuth
  }

  render() {
    return (
      <Provider store={store}>
        <ThemeProvider useDark={true} >
            <Router headerMode="none">
              <Stack key="root">
                <Scene
                  key="Launch"
                  component={Launch}
                  initial
                  on={this.authenticate}
                  success="validators"
                  failure="login"
                />
                <Scene key="login" component={Login} title="Login" />
                <Scene key="register" component={Register} title="Register" />
                <Scene key="home" component={Home} title="Home" />
                <Scene key="validators" component={Validators} title="Validators"/>
              </Stack>
            </Router>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
