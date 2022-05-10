import { configureStore } from '@reduxjs/toolkit'
import globalReducer from './stateslice'

export default configureStore({
  reducer: {
    global: globalReducer
  },
})
