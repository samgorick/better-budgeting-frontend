import AsyncStorage from '@react-native-community/async-storage';
  
  export function loginUser(user, navigation) {
  return dispatch => {
    dispatch({ type: "START_USER_LOGIN" });
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(resp => resp.json())
      .then(userData => {
        if (userData.error) {
          dispatch({ type: 'LOGIN_ERROR', error: userData.error})
          navigation.navigate('Login')
        } else {
          storeData(userData.jwt)
          dispatch({ type: 'LOGIN_USER', user: {id: userData.id, email: userData.email} })
          dispatch({ type: 'SET_BUDGET', budget: userData.budgets})
          dispatch({ type: 'SET_TRANSACTIONS', transactions: userData.transactions})
          dispatch({ type: 'SET_SAVINGS', savings: userData.savings})
        }
      });
  };
}

export function getCurrentUser(token, navigation) {
  return dispatch => {
    console.log(token)
    dispatch({ type: "START_GET_USER" });
    fetch("http://localhost:3000/login", {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(resp => resp.json())
      .then(userData => {
        console.log(userData)
        if (userData.error) {
          dispatch({ type: 'LOGIN_ERROR', error: userData.error})
          navigation.navigate('Login')
        } else {
          dispatch({ type: 'LOGIN_USER', user: {id: userData.id, email: userData.email} })
          dispatch({ type: 'SET_BUDGET', budget: userData.budgets})
          dispatch({ type: 'SET_TRANSACTIONS', transactions: userData.transactions})
          dispatch({ type: 'SET_SAVINGS', savings: userData.savings})
        }
      });
  };
}

const storeData = async (value) => {
  try {
    console.log(value)
    await AsyncStorage.setItem('jwt', value)
  } catch (err) {
    console.log(err)
  }
}

export function signUpUser(state) {
  return dispatch => {
    dispatch({ type: "START_USER_SIGNUP" });
    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(state)
    })
      .then(resp => resp.json())
      .then(userData => {
        if (userData.error) {
          alert(userData.error)
        } else {
          storeData(userData.jwt)
          dispatch({ type: 'LOGIN_USER', user: userData})
        }
      });
  };
}