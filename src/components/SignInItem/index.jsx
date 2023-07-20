import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { UserCircle } from '../Icons'

export default function SignInItem({ linkTo }) {
    return (
        <MainNavItem to={linkTo}>
            <UserCircle />
                Sign In
        </MainNavItem>
    )
}

const MainNavItem = styled(Link)`
    text-decoration: none;
    margin-right: 0.5rem;
    &:hover {
        text-decoration: underline;
    }
    & i {
        margin-right: 0.5rem;
    }
`