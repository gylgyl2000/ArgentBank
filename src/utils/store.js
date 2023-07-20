import { configureStore } from '@reduxjs/toolkit'
import userIdReducer from '../features/usersSlice'

export default configureStore({
    reducer: {
        user: userIdReducer,
    }
})