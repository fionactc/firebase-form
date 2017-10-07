import { AsyncStorage } from 'react-native';
import firebase from './firebase';

export const GET_INFO_SUCCESS = "GET_INFO_SUCCESS";
export const SAVE_KEY_SUCCESS = "SAVE_KEY_SUCCESS";

function getInfoSuccess(data) {
  return {
    type: GET_INFO_SUCCESS,
    payload: data.val()
  }
}

function saveKeySuccess(key) {
  return {
    type: SAVE_KEY_SUCCESS,
    payload: key
  }
}

export function getInfo(data) {
  return (dispatch) => {
    firebase.database().ref(data).once('value').then((info)=>{
      if (info.val()) {
        dispatch(getInfoSuccess(info));
      }
    }).catch((err)=>{
      console.error(err);
    })
  }
}

export function saveInfo(data) {
  return (dispatch) => {
    let key = firebase.database().ref().child('users').push().key;
    AsyncStorage.setItem('key', key);
    dispatch(saveKeySuccess(key));

    let update = {};
    update[key] = data;
    firebase.database().ref().update(update);
  }
}

export function updateInfo(data, key) {
  return (dispatch) => {
    let update = {};
    update[key] = data;
    firebase.database().ref().update(update);
  }
}
