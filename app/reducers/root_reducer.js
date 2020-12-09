import { combineReducers } from 'redux'

import { userReducer } from './user'
import { validatorsReducer, validatorInfoReducer } from './validator'

const rootReducer = combineReducers({
  user: userReducer,
  validators: validatorsReducer,
  validatorInfo: validatorInfoReducer,
})

export default rootReducer
