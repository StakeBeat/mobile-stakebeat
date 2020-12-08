import { GET_VALIDATORS, ADD_VALIDATOR, DEL_VALIDATOR } from '../actions/validator'

export function validatorsReducer(state = [], action) {
  switch (action.type) {
    case GET_VALIDATORS:
      return action.payload
    case ADD_VALIDATOR:
      return [...state, ...action.payload]
    case DEL_VALIDATOR:
      return [
        ...state.slice(0, action.payload),
        ...state.slice(action.payload + 1)
      ]
    default:
      return state
  }
}
