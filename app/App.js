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

import Login from './views/Login';
import Register from './views/Register';
import Home from './views/Home';
import Validators from './views/Validators';
import Profile from './views/Profile';
import Launch from './views/Launch';
import reducers from './reducers/root_reducer'
import { theme } from './core/theme'


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
            <Router headerMode={'none'}>
              <Scene key="all">
                <Scene
                  key="Launch"
                  component={Launch}
                  initial
                  on={this.authenticate}
                  success='home'
                  failure="login"
                />
                <Scene key="login" component={Login} title="Login" hideTabBar/>
                <Scene key="register" component={Register} title="Register" hideTabBar/>
                <Scene key="validators" component={Validators} title="Validators" hideTabBar />

                <Scene key="tabList"
                  tabs={true}
                  hideNavBar={false}
                  tabBarStyle={styles.tabBar}
                  showLabel={false}
                >
                  <Scene
                    key="home"
                    component={Home}
                    icon={(tab) => <Icon name="heartbeat" color={tab.navigation.isFocused() ? theme.colors.secondary : 'white'} size={24} />}
                  />
                  <Scene
                    key="notification"
                    component={Home}
                    icon={(tab) => <Icon name="flag-checkered" color={tab.navigation.isFocused()? theme.colors.secondary : 'white'} size={24} />}
                  />
                  <Scene
                    key="account"
                    component={Profile}
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
