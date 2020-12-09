import AsyncStorage from '@react-native-async-storage/async-storage';

import Api, { LOGIN_URL, REGISTER_URL, USER_URL } from '../api'

export const AUTH_USER = 'AUTH_USER'


export function setAuthUser(payload) {
  return (dispatch) => {
    return dispatch({type: AUTH_USER, payload: payload})
  }
}

export function login(payload) {
  return (dispatch) => {
    return Api.post(LOGIN_URL, payload)
      .then((resp) => {
        AsyncStorage.setItem('@stakebeat_access_token', resp['data']['access_token'])
        AsyncStorage.setItem('@stakebeat_username', payload['username'])
        dispatch(setAuthUser({username: payload['username'], accessToken: resp['data']['access_token']}))
        return true
      })
      .catch((err) => {
        console.log("error logging", err)
        return false
      })
  }
}

export function register(payload) {
  return (dispatch) => {
    return Api.post(REGISTER_URL, payload)
      .then((resp) => {
        if (resp['status'] == 200) {
          dispatch(login({'username': payload['username'], 'password': payload['password']}))
          return true
        }
        return false
      })
      .catch((err) => {
        console.log("error logging", err)
        return false
      })
  }
}

export function editUser(payload) {
  return (dispatch) => {
    return Api.put(`${USER_URL}/edit`, payload, {Authorization: `JWT ${payload['accessToken']}`})
      .then((resp) => {
        if (resp['status'] != 200) {
          console.log("error editUser")
        }
      }).catch((err) => {
        console.log("error editUser: ", err)
      })
  }
}
