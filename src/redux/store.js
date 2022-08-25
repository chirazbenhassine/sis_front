import { combineReducers, configureStore } from '@reduxjs/toolkit'
import pointeauReducer from './reducers/pointeaux.reducer'
import rondsReducer from './reducers/ronds.reducer'


const reducers = combineReducers({
  pointeau: pointeauReducer,
  ronds: rondsReducer,
})

export const store = configureStore({
  reducer: reducers
})