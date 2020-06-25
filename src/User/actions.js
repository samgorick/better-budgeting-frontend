  export function loginUser(state) {
  return dispatch => {
    dispatch({ type: "START_USER_LOGIN" });
    fetch("http://localhost:3000/login", {
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
          dispatch({ type: 'LOGIN_USER', user: {id: userData.id, email: userData.email} })
          dispatch({ type: 'SET_TRANSACTIONS', transactions: userData.transactions})
        }
      });
  };
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
        console.log(userData)
        if (userData.error) {
          alert(userData.error)
        } else {
          dispatch({ type: 'LOGIN_USER', user: userData})
        }
      });
  };
}