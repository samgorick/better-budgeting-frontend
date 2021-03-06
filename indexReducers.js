import { combineReducers } from 'redux'
import {userReducer, errorReducer, loadingReducer} from './src/User/reducers'
import transactionsReducer from './src/Transactions/reducers'
import budgetReducer from './src/Budgets/reducers'
import savingReducer from './src/Savings/reducers'

const rootReducer = combineReducers({
  user: userReducer,
  error: errorReducer,
  transactions: transactionsReducer,
  budget: budgetReducer,
  savings: savingReducer,
  loading: loadingReducer
})

export default rootReducer