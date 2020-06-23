  
export function loginUser(username) {
  return dispatch => {
    dispatch({ type: "START_USER_LOGIN" });
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ username: username })
    })
      .then(resp => resp.json())
      .then(userData => {
        dispatch({ type: "LOGIN_USER", userData})
        dispatch({ type: "SET_NOTES", notes: userData.notes})
        history.push('/notes')
      });
  };
}