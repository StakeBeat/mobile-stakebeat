import { AUTH_USER } from '../actions/user'

export function userReducer(state = {}, action) {
  switch (action.type) {
    case AUTH_USER:
      return action.payload
    default:
      return state
  }
}
