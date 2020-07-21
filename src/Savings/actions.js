import {
  START_ADD_SAVING,
  ADD_SAVING_SUCCESS,
  START_UPDATE_SAVING,
  UPDATE_SAVING_SUCCESS
} from '../constants/Types';

const SAVING = 'http://localhost:3000/savings';
const SAVING_VALUE = 'http://localhost:3000/saving_values';

export function addSaving(saving, navigation) {
  return dispatch => {
    dispatch({type: START_ADD_SAVING});
    fetch(SAVING, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({saving: saving})
    })
      .then(resp => resp.json())
      .then(savingData => {
        dispatch({type: ADD_SAVING_SUCCESS, saving: savingData});
        navigation.navigate('Savings');
      });
  };
}

export function updateSavingValue(saving, navigation) {
  return dispatch => {
    dispatch({type: START_UPDATE_SAVING});
    fetch(SAVING_VALUE, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({saving: saving})
    })
      .then(resp => resp.json())
      .then(savingData => {
        dispatch({type: UPDATE_SAVING_SUCCESS, saving: savingData});
        navigation.navigate('Savings');
      });
  };
}
