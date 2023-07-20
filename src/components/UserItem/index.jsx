import styled from 'styled-components'
import { UserCircle } from '../Icons'

export default function UserItem({ linkTo, firstName }) {
    return (
        <MainNavItem href={linkTo}>
            <UserCircle />
            {firstName}
        </MainNavItem>
    )
}

const MainNavItem = styled.a`
    text-decoration: none;
    margin-right: 0.5rem;
    &:hover {
        text-decoration: underline;
    }
    & i {
        margin-right: 0.5rem;
    }
`