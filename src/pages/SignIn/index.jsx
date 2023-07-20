import styled from 'styled-components'
import LoginForm from "../../layouts/LoginForm"
import colors from '../../style/color'
import { UserCircle } from '../../components/Icons'

export default function SignIn() {
    return (
        <SignInMain>
            <SignInContent>
                <UserCircle style={{ fontSize: '1rem'}} />
                <h1>Sign In</h1>
                <LoginForm />
            </SignInContent>
        </SignInMain>
    )
}

const SignInMain = styled.main`
    flex: 1;
    background-color: ${colors.backgroundColor};
`
const SignInContent = styled.section`
    box-sizing: border-box;
    background-color: ${colors.whiteBackground};
    width: 300px;
    margin: 0 auto;
    margin-top: 3rem;
    padding: 2rem;
    text-align: center;
`