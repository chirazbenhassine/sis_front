import { combineReducers, configureStore } from '@reduxjs/toolkit'
import pointeauReducer from './reducers/pointeaux.reducer'


const reducers = combineReducers({
  pointeau: pointeauReducer
})

export const store = configureStore({
  reducer: reducers
})