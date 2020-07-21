import * as Types from '../constants/Types'

import AsyncStorage from '@react-native-community/async-storage';

export function loginUser(user, navigation) {
  return dispatch => {
    dispatch({type: Types.START_LOADING});
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({user: user}),
    })
      .then(resp => resp.json())
      .then(userData => {
        if (userData.error) {
          dispatch({type: Types.END_LOADING});
          dispatch({type: Types.LOGIN_ERROR, error: userData.error});
          navigation.navigate('Login');
        } else {
          storeData(userData.jwt);
          dispatch({type: Types.END_LOADING});
          dispatch({
            type: Types.LOGIN_USER,
            user: {id: userData.id, email: userData.email},
          });
          dispatch({type: Types.SET_BUDGET, budget: userData.budgets});
          dispatch({
            type: Types.SET_TRANSACTIONS,
            transactions: userData.transactions,
          });
          dispatch({type: Types.SET_SAVINGS, savings: userData.savings});
        }
      });
  };
}

export function getCurrentUser(navigation) {
  return async dispatch => {
    const token = await getData();
    if (token) {
      dispatch({type: Types.START_LOADING});
      fetch('http://localhost:3000/login', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(resp => resp.json())
        .then(userData => {
          if (userData.error) {
            dispatch({type: Types.END_LOADING});
            dispatch({type: Types.LOGIN_ERROR, error: userData.error});
            navigation.navigate('Login');
          } else {
            dispatch({
              type: Types.LOGIN_USER,
              user: {id: userData.id, email: userData.email},
            });
            dispatch({type: Types.END_LOADING});
            dispatch({type: Types.SET_BUDGET, budget: userData.budgets});
            dispatch({
              type: Types.SET_TRANSACTIONS,
              transactions: userData.transactions,
            });
            dispatch({type: Types.SET_SAVINGS, savings: userData.savings});
          }
        });
    } else {
      dispatch({type: Types.END_LOADING});
    }
  };
}

const storeData = async value => {
  try {
    await AsyncStorage.setItem('jwt', value);
  } catch (err) {
    console.log(err);
  }
};

const getData = async () => {
  try {
    const token = await AsyncStorage.getItem('jwt');
    if (token !== null) {
      return token;
    }
  } catch (err) {
    console.log(err);
  }
};

const removeValue = async () => {
  try {
    await AsyncStorage.removeItem('jwt');
  } catch (err) {
    console.log(err);
  }
  console.log('Done.');
};

export function logoutUser() {
  return dispatch => {
    removeValue();
    dispatch({type: Types.LOGOUT_USER});
    dispatch({type: Types.LOGOUT_BUDGET});
    dispatch({type: Types.LOGOUT_TRANSACTIONS});
    dispatch({type: Types.LOGOUT_SAVINGS});
  };
}

export function signUpUser(user) {
  return dispatch => {
    dispatch({type: Types.START_LOADING});
    fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({user: user}),
    })
      .then(resp => resp.json())
      .then(userData => {
        if (userData.error) {
          dispatch({type: Types.END_LOADING});
          dispatch({type: Types.LOGIN_ERROR, error: userData.error});
        } else {
          console.log(userData);
          storeData(userData.jwt);
          dispatch({type: Types.END_LOADING});
          dispatch({
            type: Types.LOGIN_USER,
            user: {id: userData.id, email: userData.email},
          });
          dispatch({type: Types.SET_BUDGET, budget: userData.budgets});
          dispatch({
            type: Types.SET_TRANSACTIONS,
            transactions: userData.transactions,
          });
          dispatch({type: Types.SET_SAVINGS, savings: userData.savings});
        }
      });
  };
}
