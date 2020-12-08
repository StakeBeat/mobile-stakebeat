import { combineReducers } from 'redux'

import { userReducer } from './user'
import { validatorsReducer } from './validator'

const rootReducer = combineReducers({
  user: userReducer,
  validators: validatorsReducer,
})

export default rootReducer
