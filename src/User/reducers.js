export function userReducer(state=null, action) {
  switch (action.type) {
    case 'LOGIN_USER':
      return action.user

    default:
      return state;
  }
}

export function errorReducer(state=null, action) {
  switch (action.type) {
    case 'LOGIN_ERROR':
      return action.error

    default:
      return state;
  }
}