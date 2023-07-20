import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getUserProfile, initProfile } from '../../features/usersSlice'
import { userInfosSelector } from '../../utils/selectors'
import styled from 'styled-components'
import colors from '../../style/color'
import UserHero from '../../components/UserHero'
import Accounts from '../../layouts/Accounts'
import infoAccounts from '../../data/infoAccounts.json'

export default function Profile() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userId } = useParams()
    const token = sessionStorage.ARGENTBANK_token
    const id = JSON.parse(localStorage.getItem('ARGENTBANK_userInfos')).id
    let { firstName, lastName } = useSelector(state => userInfosSelector(state))

    // Check token to grant access or throw to /signin page
    useEffect(() => {
        if (!token) {
                dispatch(initProfile())
                navigate('/ArgentBank/login')
            }
            else {
            try {
                dispatch(getUserProfile(token))
            } catch (error) {
                console.log('ERROR GETTING USER DATA -', error)
                dispatch(initProfile())
                navigate('/ArgentBank/login')
            }
        }
    }, [dispatch, navigate, token])

      // Secure userId route
    useEffect(() => {
        if (userId !== id) {
            dispatch(initProfile())
            navigate('/ArgentBank/login')
        }
    }, [dispatch, id, navigate, userId])

    return (
        <UserMain>
            <UserHero
                message='Welcome back'
                firstName={firstName}
                lastName={lastName}
            />
            <UserSrOnly>Accounts</UserSrOnly>
            {infoAccounts.map((element, index) => (
                <Accounts 
                    accountTitle={element.title}
                    accountAmount={element.amount}
                    accountAmountDescription={element.amountDescription}
                    userId={userId}
                    key={`account-${index}`}
                />
            ))}
        </UserMain>
    )
}

const UserMain = styled.main`
    flex: 1;
    background-color: ${colors.backgroundColor};
`
const UserSrOnly = styled.h2`
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