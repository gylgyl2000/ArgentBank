import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { SignOut } from '../Icons'

export default function SignOutItem({ linkTo }) {
    return (
        <MainNavItem to={linkTo}>
            <SignOut /><span>Sign Out</span>
        </MainNavItem>
    )
}

const MainNavItem = styled(Link)`
    text-decoration: none;
    margin-left: 0.5rem;
    &:hover {
        text-decoration: underline;
    }
    & i {
        margin-right: 0.5rem;
    }
    & span {
        display: none;
        @media (min-width: 790px) {
            display: initial;
            margin-right: 0.5rem;
        }
    }
`