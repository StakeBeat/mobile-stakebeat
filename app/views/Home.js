import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Tabs, Scene } from 'react-native-router-flux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View , SafeAreaView, ScrollView} from 'react-native'

import { Text, ListItem, Badge } from 'react-native-elements'

import { getValidatorInfo } from '../actions/validator'
import { setAuthUser } from '../actions/user'
import { theme } from '../core/theme'
import Background from '../components/Background'
import BalanceChart from '../components/BalanceChart'
import Ethereum from '../components/Ethereum'
import NavBar from '../components/NavBar'

class Home extends Component {
  async componentDidMount() {
    if (Object.keys(this.props.currentUser).length == 0) {
      try {
        const accessToken = await AsyncStorage.getItem('@stakebeat_access_token')
        const username = await AsyncStorage.getItem('@stakebeat_username')
        this.props.setAuthUser({ username, accessToken })
        this.props.getValidatorInfo(accessToken)
      } catch(e) {
        console.log('error: ', e)
      }
    } else {
      this.props.getValidatorInfo(accessToken)
    }
  }

  render() {
    return (
      <Background>
        <NavBar />
        <View style={{...theme.container, ...theme.maxWidth, flexDirection: 'column'}}>
          {this.renderTotalBalance()}
          {this.renderBalanceGraph()}
          {this.renderValidatorList()}
        </View>
      </Background>
    )
  }

  renderTotalBalance() {
    return (
      <View style={styles.totalBalance}>
        <View>
          <Text style={styles.totalBalanceTitle}>Total Balance</Text>
          <View style={{ justifyContent: 'center' }}>
            <Text style={{color: 'white', fontSize: 24}}>
            <Ethereum width={25} height={25}/>
    {this.props.info.global.balance}</Text>
          </View>
        </View>
        <View style={styles.avgRatingView}>
          <Text style={styles.totalBalanceTitle}>
            Avg Rating
          </Text>
          <Text style={styles.avgRating}>
            {this.props.info.global.rating}
          </Text>
        </View>
      </View>
    )
  }

  renderBalanceGraph() {
    return (
      <View style={styles.balanceGraph}>
        <BalanceChart labels={Object.keys(this.props.info.global.overtime)} data={Object.values(this.props.info.global.overtime)} />
      </View>
    )
  }

  renderSingleValidator(valIndex, validator) {
    return (
      <ListItem key={valIndex} containerStyle={{backgroundColor: 'none', borderBottomWidth: 1, borderBottomColor: theme.colors.primary}}>
        <Badge
          status="success"
        />
        <ListItem.Content>
          <ListItem.Title style={{color: '#B5B5B5', fontSize: 14}}>Validator #{valIndex}</ListItem.Title>
          <ListItem.Subtitle style={{color: 'white', fontSize: 18}}><Ethereum width={15} height={15} />{validator.balance}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Content style={{ alignItems: 'flex-end' }}>
            <Text style={{color: theme.colors.secondary, fontSize: 18}}>{validator.rating}</Text>
        </ListItem.Content>
      </ListItem>
    )
  }

  renderValidatorList() {
    return (
      <SafeAreaView style={styles.validatorList}>
        <ScrollView>
          {
            Object.keys(this.props.info.validators).map(valIndex => (

              this.renderSingleValidator(valIndex, this.props.info.validators[valIndex])
            ))
          }
       </ScrollView>
      </SafeAreaView>
    )
  }

}

const styles = {
  totalBalance: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "100%",
    marginTop: 10,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
  },
  totalBalanceTitle: {
    color: '#DBDBDB',
  },
  avgRatingView: {
    alignItems: 'flex-end',
    borderLeftWidth: 1,
    borderLeftColor: '#274675',
    paddingLeft: 10,
  },
  avgRating: {
    color: theme.colors.secondary,
    fontSize: 24,
  },
  balanceGraph: {
    marginTop: 20,
  },
  validatorList: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0,

  },
  oneValidator: {
    width: 40,
    height: 40,
    backgroundColor: theme.colors.primary,
  }
}


function mapStateToProps(state) {
  return { currentUser: state.user, info: state.validatorInfo }
}

export default connect(mapStateToProps, { getValidatorInfo, setAuthUser })(Home)
