import React, { Component } from 'react'

import ValidatorList from '../components/ValidatorList'
import ValidatorAdd from '../components/ValidatorAdd'
import Background from '../components/Background'
import NavBar from '../components/NavBar'

class ValidatorManage extends Component {
  render() {
    return (
      <Background>
        <NavBar />
        <ValidatorAdd />
        <ValidatorList />
      </Background>

    )
  }
}

export default ValidatorManage
