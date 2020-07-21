import {
  ADD_SAVING_SUCCESS,
  UPDATE_SAVING_SUCCESS,
  SET_SAVINGS,
  LOGOUT_SAVINGS
} from '../constants/Types';

export default function savingReducer(state=[], action) {
  switch (action.type) {
    case SET_SAVINGS:
      return action.savings
    
    case ADD_SAVING_SUCCESS:
      return [...state, action.saving]

    case UPDATE_SAVING_SUCCESS:
      return state.map(saving => saving.id === action.saving.id ? action.saving : saving)

    case LOGOUT_SAVINGS:
      return []

    default:
      return state;
  }
}