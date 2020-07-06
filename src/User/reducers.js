export function userReducer(state=null, action) {
  switch (action.type) {
    case 'LOGIN_USER':
      return action.user

    case 'LOGOUT_USER':
      return null

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

export function loadingReducer(state=true, action) {
  switch (action.type) {
    case 'START_LOADING': 
      return true

    case 'END_LOADING':
      return false

    default: 
      return state
  }
}