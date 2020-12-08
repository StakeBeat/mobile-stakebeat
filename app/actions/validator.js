import Api, { VALIDATORS_URL } from '../api'

export const GET_VALIDATORS = 'GET_VALIDATORS'
export const ADD_VALIDATOR = 'ADD_VALIDATOR'
export const DEL_VALIDATOR = 'DEL_VALIDATOR'

export function getValidators(payload) {
  return (dispatch) => {
    return Api.get(VALIDATORS_URL, {Authorization: `JWT ${payload['accessToken']}`})
      .then((resp) => {
        if (resp['data']['code'] == 200) {
          return dispatch({type: GET_VALIDATORS, payload: resp['data']['validators']})
        }
      })
      .catch((err) => {
        console.log("error fetching validators: ", err)
      })
  }
}

export function addValidator(payload) {
  return (dispatch) => {
    return Api.post(VALIDATORS_URL, {indices: [payload['index']]}, {Authorization: `JWT ${payload['accessToken']}`})
      .then((resp) => {
        if (resp['data']['code'] == 201) {
          return dispatch({type: ADD_VALIDATOR, payload: resp['data']['validators']})
        } else {
          console.log("error adding validator")
        }
      })
      .catch((err) => {
        console.log("error adding validators: ", err)
      })
  }
}

export function delValidator(payload) {
  return (dispatch) => {
    return Api.del(VALIDATORS_URL,
      { index: payload['index'] },
      {Authorization: `JWT ${payload['accessToken']}`}
    ).then((resp) => {
        if (resp['data']['code'] == 200) {
          return dispatch({type: DEL_VALIDATOR, payload: payload['position']})
        } else {
          console.log("error deleting validator")
        }
      })
      .catch((err) => {
        console.log("error deleting validators: ", err)
      })
  }
}
