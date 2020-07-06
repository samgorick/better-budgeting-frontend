import AsyncStorage from '@react-native-community/async-storage';

export function loginUser(user, navigation) {
  return dispatch => {
    dispatch({type: 'START_LOADING'});
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(resp => resp.json())
      .then(userData => {
        if (userData.error) {
          dispatch({type: 'END_LOADING'});
          dispatch({type: 'LOGIN_ERROR', error: userData.error});
          navigation.navigate('Login');
        } else {
          storeData(userData.jwt);
          dispatch({type: 'END_LOADING'});
          dispatch({
            type: 'LOGIN_USER',
            user: {id: userData.id, email: userData.email},
          });
          dispatch({type: 'SET_BUDGET', budget: userData.budgets});
          dispatch({
            type: 'SET_TRANSACTIONS',
            transactions: userData.transactions,
          });
          dispatch({type: 'SET_SAVINGS', savings: userData.savings});
        }
      });
  };
}

export function getCurrentUser(navigation) {
  return async dispatch => {
    const token = await getData();
    if (token) {
      dispatch({type: 'START_LOADING'});
      fetch('http://localhost:3000/login', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(resp => resp.json())
        .then(userData => {
          if (userData.error) {
            dispatch({type: 'END_LOADING'});
            dispatch({type: 'LOGIN_ERROR', error: userData.error});
            navigation.navigate('Login');
          } else {
            dispatch({
              type: 'LOGIN_USER',
              user: {id: userData.id, email: userData.email},
            });
            dispatch({type: 'END_LOADING'});
            dispatch({type: 'SET_BUDGET', budget: userData.budgets});
            dispatch({
              type: 'SET_TRANSACTIONS',
              transactions: userData.transactions,
            });
            dispatch({type: 'SET_SAVINGS', savings: userData.savings});
          }
        });
    }
    else {
      dispatch({type: 'END_LOADING'});
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
  } catch (e) {
    console.log(err);
  }
  console.log('Done.');
};

export function logoutUser() {
  return dispatch => {
    removeValue();
    dispatch({type: 'LOGOUT_USER'});
  };
}

export function signUpUser(state) {
  return dispatch => {
    dispatch({type: 'START_USER_SIGNUP'});
    fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(state),
    })
      .then(resp => resp.json())
      .then(userData => {
        if (userData.error) {
          alert(userData.error);
        } else {
          storeData(userData.jwt);
          dispatch({type: 'LOGIN_USER', user: userData});
        }
      });
  };
}
