import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { userInfosSelector } from '../../utils/selectors'
import styled from 'styled-components'
import SignInItem from '../../components/SignInItem'
import SignOutItem from '../../components/SignOutItem'
import UserItem from '../../components/UserItem'
import argentBankLogo from '../../assets/argentBankLogo.png'

export default function Header() {
    const connected = useSelector(state => state.user.status === 'connected')
    const { firstName } = useSelector(state => userInfosSelector(state))
    const userId = useSelector(state => userInfosSelector(state).id)
    return (
        <HeaderContainer>
            <HeaderLogo to='/ArgentBank/'>
                <HeaderLogoImage
                    src= {argentBankLogo}
                    alt='Argent Bank Logo'
                />
                <HeaderSrOnly>Argent Bank</HeaderSrOnly>
            </HeaderLogo>
            <div>
                {connected ? (
                    <>
                        <UserItem
                            firstName={firstName}
                            linkTo={`/ArgentBank/profile/${userId}`}
                        />
                        <SignOutItem linkTo='/ArgentBank/' />
                    </>
                ) : (
                    <SignInItem linkTo='/ArgentBank/login'/>
                )}
                        </div>
        </HeaderContainer>
    )
}

const HeaderContainer = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 20px;
    & a {
        font-weight: bold;
        color: #2c3e50;
    }
    & a.router-link-exact-active {
        color: #42b983;
    }
`
const HeaderLogo = styled(Link)`
    display: flex;
    align-items: center;
`
const HeaderLogoImage = styled.img`
    max-width: 100%;
    width: 200px;
`
const HeaderSrOnly = styled.h1`
    border: 0 !important;
    clip: rect(1px, 1px, 1px, 1px) !important; /* 1 */
    -webkit-clip-path: inset(50%) !important;
    clip-path: inset(50%) !important; /* 2 */
    height: 1px !important;
    margin: -1px !important;
    overflow: hidden !important;
    padding: 0 !important;
    position: absolute !important;
    width: 1px !important;
    white-space: nowrap !important; /* 3 */
`