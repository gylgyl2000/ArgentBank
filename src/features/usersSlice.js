import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { rememberMeSelector, statusSelector } from '../utils/selectors'

// User initial state
const initialState = {
    status: 'void',
    rememberMe: localStorage.getItem('ARGENTBANK_rememberMe') === 'true' || false,
    error: null,
    infos: {
        firstName: null,
        lastName: null,
        id: null,
        email: null,
        createdAt: null,
        transactions: null,
    },
}

/* ---- Functions & Middleware Thunks to dispatch actions in user reducer ---- */

export function setRememberMe(value) {
    return (dispatch) => {
        dispatch(remember(value))
        localStorage.setItem('ARGENTBANK_rememberMe', value)
    }
}

export function initProfile() {
    return async (dispatch, getState) => {
        const status = statusSelector(getState())
        if (status === 'connected') {
            console.log('DISCONNECTING - Empty User Credentials')
            dispatch(init())
        }
        return
    }
}

export function signinUser(email, password, rememberMe) {
    return async (dispatch, getState) => {
        if (!rememberMe) {
            rememberMe = rememberMeSelector(getState())
        }
        dispatch(fetching())
        try {
            const response = await axios.post('http://localhost:3001/api/v1/user/login',
                { email, password }
            )
            const token = await response.data.body.token
            const bearerToken = `Bearer ${token}`
            dispatch(resolvedUser(bearerToken, rememberMe))
        } catch (error) {
            console.log('ERROR CONNECTING -', error)
            alert('User unknown\n Please try again...')
            dispatch(rejected(error.message))
        }
    }
}

export function getUserProfile(token) {
    return async (dispatch, getState) => {
        const userInfosStorage = localStorage.getItem('ARGENTBANK_userInfos')
        const rememberMe = rememberMeSelector(getState())
        const status = statusSelector(getState())
        if (status !== 'connected' && status !== 'void') {
            console.log('EXITING / Status -', status)
            return
        }
        dispatch(fetching())
        if (userInfosStorage && JSON.parse(userInfosStorage).firstName !== undefined) {
            const data = JSON.parse(userInfosStorage)
            dispatch(resolvedUser(token, rememberMe, data))
            return
        }
        try {
            const response = await axios.post('http://localhost:3001/api/v1/user/profile',
                { request: getUserProfile},
                { headers: { Authorization: token } }
            )
            const data = await response.data.body
            dispatch(resolvedUser(token, rememberMe, data))
        } catch (error) {
            console.log('ERROR CONNECTING -', error)
            dispatch(rejected(error.message))
        }
    }
}

export function updateUserProfile(token, values) {
    return async (dispatch, getState) => {
        const rememberMe = rememberMeSelector(getState())
        const status = statusSelector(getState())
        if (status !== 'connected' && status !== 'void') {
            console.log('EXITING / Status -', status)
            return
        }
        dispatch(fetching())
        try {
            const response = await axios.put('http://localhost:3001/api/v1/user/profile',
                { firstName: values.firstName,
                    lastName: values.lastName,
                },
                { headers:
                    { Authorization: token }
                })
            const data = response.data.body
            dispatch(resolvedUser(token, rememberMe, data))
        } catch (error) {
            console.log('ERROR CONNECTING -', error)
            dispatch(rejected(error.message))
        }
    }
}

const { actions, reducer } = createSlice({
    name: 'user',
    initialState,
    reducers: {
        init: (draft) => {
            draft.status = 'void'
            draft.infos = initialState.infos
            // Remove token from sessionStorage on logout
            // Token should be managed by a cookie with 'HTMLOnly' parameter served from API
            sessionStorage.removeItem('ARGENTBANK_token')
            const oldStorage = JSON.parse(localStorage.getItem('ARGENTBANK_userInfos'))
            localStorage.setItem('ARGENTBANK_userInfos', JSON.stringify({ email: oldStorage.email }))
            return
        },
        remember: (draft, action) => { draft.rememberMe = action.payload },
        fetching: (draft) => {
            draft.error = null
            if (draft.status === 'resolved') {
                draft.status = 'updating'
                return
            } else {
                draft.status = 'pending'
                return
            }
        },
        resolvedUser: {
            prepare: (bearerToken, rememberMe = false, data = initialState.infos) => ({
                payload: { bearerToken, rememberMe, data }
            }),
            reducer: (draft, action) => {
                console.log('RESOLVED User -', action.payload);
                if (draft.status === 'pending' || draft.status === 'updating') {
                    draft.status = 'connected'
                    draft.rememberMe = action.payload.rememberMe
                    draft.infos.email = action.payload.data.email
                    draft.infos.id = action.payload.data.id
                    draft.infos.firstName = action.payload.data.firstName
                    draft.infos.lastName = action.payload.data.lastName
                    draft.infos.createdAt = action.payload.data.createdAt
                    draft.infos.transactions = action.payload.data.transactions
                    localStorage.setItem('ARGENTBANK_rememberMe', action.payload.rememberMe)
                    // Add token to sessionStorage on signin
                    // Token should be managed by a cookie with 'HTMLOnly' parameter served from API
                    sessionStorage.setItem('ARGENTBANK_token', action.payload.bearerToken)
                    if (draft.infos.firstName !== null) {
                        localStorage.setItem('ARGENTBANK_userInfos', JSON.stringify(draft.infos))
                    }
                    return
                }
                return
            }
        },
        rejected: {
            prepare: (error) => ({
                payload: { error }
            }),
            reducer: (draft, action) => {
                if (draft.status === 'pending' || draft.status === 'updating') {
                    draft.status = 'rejected'
                    draft.error = action.payload.error
                    return
                }
                return
            }
        },
    }
})

// Actions & Reducer from CreateSlice()
const {
    init,
    remember,
    fetching,
    resolvedUser,
    rejected,
} = actions
export default reducer