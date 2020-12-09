import {
  GET_VALIDATORS,
  ADD_VALIDATOR,
  DEL_VALIDATOR,
  VALIDATOR_INFO,
}
from '../actions/validator'

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


export function validatorInfoReducer(state = {}, action) {
  switch (action.type) {
    case VALIDATOR_INFO:
      return action.payload
    default:
      return {
        global: {
          balance: '0',
          rating: '?',
          overtime: {
            0: 0,
          },
        },
        validators: {
        }
      }
  }
}
