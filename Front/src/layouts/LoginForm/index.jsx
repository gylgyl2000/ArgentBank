import { useEffect, useState, useRef } from "react"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signinUser, setRememberMe, getUserProfile } from "../../features/usersSlice"
import { rememberMeSelector, statusSelector, userInfosSelector } from "../../utils/selectors"
import styled from 'styled-components'

export default function LoginForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formValidator, setFormValidator] = useState(false)
    const emailError = useRef(null)
    const passwordError = useRef(null)
    const connected = useSelector(state => statusSelector(state) === 'connected')
    const rememberMe = useSelector(state => rememberMeSelector(state) === true)
    const userId = useSelector(state => userInfosSelector(state).id)

    // Auto-displays user email on demand
    useEffect(() => {
        if (rememberMe &&
            localStorage.ARGENTBANK_userInfos &&
            localStorage.ARGENTBANK_userInfos.email !== null) {
                setEmail(JSON.parse(localStorage.ARGENTBANK_userInfos).email)
                document.querySelector('#remember-me').setAttribute('checked', true)
            }
    }, [rememberMe])

    // Fetch USERPROFILE if access granted
    useEffect(() => {
        if (connected) {
            const token = sessionStorage.ARGENTBANK_token
            dispatch(getUserProfile(token))
        }
    }, [connected, dispatch])

    // Navigate to USER PAGE with ID if profile fetched
    useEffect(() => {
        if (connected) {
            navigate(`/ArgentBank/profile/${userId}`)
        }
    }, [connected, navigate, userId])

    // Dispatch user's credentials to gain access to user's Page
    function logIn(e) {
        e.preventDefault()
        if (!formValidator) {
            return
        }
        // Third arg for remeberMe
        if (e.target[2].checked) {
            dispatch(signinUser(email, password, true))
        } else {
            dispatch(signinUser(email, password))
        }
    }
    // Validate each input and sets value for email & password
    function validateForm(type, value) {
        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
        switch (type) {
            case 'email':
                setEmail(value)
                if (!emailRegex.test(value)) {
                    emailError.current.className = 'error-msg error-show'
                    setFormValidator(false)
                    return
                } else {
                    emailError.current.className = 'error-msg'
                }
                break
            default:
                setPassword(value)
                if (value.length < 6) {
                    passwordError.current.className = 'error-msg error-show'
                    setFormValidator(false)
                    return
                } else {
                    passwordError.current.className = 'error-msg'
                }
                break
        }
        setFormValidator(true)
    }
    function toggleRememberMe() {
        dispatch(setRememberMe(!rememberMe))
    }
    return (
        <form onSubmit={e => logIn(e)}>
            <InputWrapper>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    onChange={e => validateForm('email', e.target.value)}
                    value={email}
                />
                <div className="error-msg"
                    ref={emailError}>
                        This is not a correct email
                </div>
            </InputWrapper>
            <InputWrapper>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    onChange={e => validateForm('password', e.target.value)}
                />
                <div className="error-msg"
                    ref={passwordError}>
                        Password should be at least 6 characters long
                </div>
            </InputWrapper>
            <InputRemember>
                <input
                    type="checkbox"
                    id="remember-me"
                    onClick={toggleRememberMe}
                />
                <label htmlFor="remember-me">Remember me</label>
            </InputRemember>
            <SignInButton type='submit' value="Sign In" />
        </form>
    )
}

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-bottom: 1rem;
    & label {
        font-weight: bold;
        text-align: left;
    }
    & input {
        padding: 5px;
        font-size: 1.2rem;
        text-align: left;
    }
`
const InputRemember = styled.div`
    display: flex;
    & label {
        margin-left: 0.25rem;
    }
`
const SignInButton = styled.input`
    display: block;
    width: 100%;
    padding: 8px;
    font-size: 1.1rem;
    font-weight: bold;
    margin-top: 1rem;
    border-color: #00bc77;
    background-color: #00bc77;
    color: #fff;
    cursor: pointer;
`