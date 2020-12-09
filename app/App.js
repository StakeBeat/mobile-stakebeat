import React, { Component } from 'react';
import { Provider } from 'react-redux';
import promise from 'redux-promise'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {
  Scene,
  Router,
  Stack,
  Tabs,
} from 'react-native-router-flux';
import { ThemeProvider } from 'react-native-elements'

import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { theme } from './core/theme'
import reducers from './reducers/root_reducer'

import Login from './views/Login';
import Register from './views/Register';
import Home from './views/Home';
import ValidatorGetStarted from './views/ValidatorGetStarted';
import ValidatorManage from './views/ValidatorManage';
import Profile from './views/Profile'
import Launch from './views/Launch'
import NotificationGetStarted from './views/NotificationGetStarted'


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
            <Router>
              <Scene key="all">
                <Scene
                  key="Launch"
                  component={Launch}
                  initial
                  on={this.authenticate}
                  success='home'
                  failure="login"
                  hideNavBar={true}
                />
                <Scene
                  key="login"
                  component={Login}
                  title="Login"
                  hideTabBar
                  hideNavBar={true}
                />
                <Scene
                  key="register"
                  component={Register}
                  title="Register"
                  hideTabBar
                  hideNavBar={true}
                />
                <Scene
                  key="validatorGetStarted"
                  component={ValidatorGetStarted}
                  title="ValidatorGetStarted"
                  hideTabBar
                  hideNavBar={true}
                />
                <Scene
                  key="notificationGetStarted"
                  component={NotificationGetStarted}
                  title="notificationGetStarted"
                  hideTabBar
                  hideNavBar={true}
                />
                <Scene
                  key="validatorManage"
                  component={ValidatorManage}
                  back={true}
                  hideNavBar={false}
                  navTransparent={true}
                />

                <Scene key="tabList"
                  tabs={true}
                  hideNavBar={true}
                  tabBarStyle={styles.tabBar}
                  showLabel={false}
                >
                  <Scene
                    key="home"
                    component={Home}
                    hideNavBar={true}
                    icon={(tab) => <Icon name="heartbeat" color={tab.navigation.isFocused() ? theme.colors.secondary : 'white'} size={24} />}
                  />
                  <Scene
                    key="notification"
                    component={Home}
                    hideNavBar={true}
                    icon={(tab) => <Icon name="flag-checkered" color={tab.navigation.isFocused()? theme.colors.secondary : 'white'} size={24} />}
                  />
                  <Scene
                    key="account"
                    component={Profile}
                    hideNavBar={true}
                    icon={(tab) => <Icon name="user" color={tab.navigation.isFocused() ? theme.colors.secondary : 'white'} size={24} />}
                  />
                </Scene>
              </Scene>
            </Router>
        </ThemeProvider>
      </Provider>
    );
  }
}


const styles = {
  tabBar: {
     backgroundColor: theme.colors.surface,
     borderTopColor: 'black',
     borderTopWidth: 1.2,
  }
}

export default App;
