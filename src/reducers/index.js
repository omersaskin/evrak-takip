import { combineReducers } from 'redux'

import firmReducer from './firmReducer'

export default combineReducers({
  firmList: firmReducer,
  firmListCount: firmReducer,
})