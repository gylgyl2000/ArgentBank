import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { getUserProfile, initProfile } from '../../features/usersSlice'
import transactions from '../../data/transactions.json'
import styled from 'styled-components'
import Transaction from '../../layouts/Transaction'
import colors from '../../style/color'
import { ArrowLeft } from '../../components/Icons'

export default function Transactions() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userId } = useParams()
    const token = sessionStorage.ARGENTBANK_token
    const id = JSON.parse(localStorage.getItem('ARGENTBANK_userInfos')).id

    // Check token to grant access or throw to /ArgentBank/login page
    useEffect(() => {
        if (!token) {
            dispatch(initProfile())
            navigate('/ArgentBank/login')
        }
        else {
            try {
                dispatch(getUserProfile(token))
            } catch (error) {
                console.log('ERROR GETTING USER/TRANSACTIONS DATA -', error)
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
        <TransactionsMain>
            <TransactionsHeader>
                <TransactionsBack>
                    <Link to={`/ArgentBank/profile/${userId}`}>
                        <ArrowLeft />
                            Back 
                    </Link>
                </TransactionsBack>
                <h3>Argent Bank Checking (x8349)</h3>
                <h1>$2,082.79</h1>
                <h4>Available Balance</h4>
            </TransactionsHeader>
            <TransactionsSrOnly>Transactions</TransactionsSrOnly>
            <TransactionsDiv>
                <TransactionsWrapper>
                    <TransactionsColumnTitle>
                        <TransactionsColumn> </TransactionsColumn>
                        <TransactionsColumn>DATE</TransactionsColumn>
                        <TransactionsColumn>DESCRIPTION</TransactionsColumn>
                        <TransactionsColumn>AMOUNT</TransactionsColumn>
                        <TransactionsColumn>BALANCE</TransactionsColumn>
                    </TransactionsColumnTitle>
                    {transactions.map((transaction, i) => (
                        <Transaction data={transaction} token={token} index={i} key={`transaction-${i}`} />
                    ))}
                </TransactionsWrapper>
            </TransactionsDiv>
        </TransactionsMain>
    )
}

const TransactionsMain = styled.main`
    flex: 1;
    background-color: ${colors.backgroundColor};
`
const TransactionsHeader = styled.div`
    
    background-color: ${colors.whiteBackground};
    border: 1px solid ${colors.backgroundColor};
    text-align: center;
    line-height: 12px;
    padding: 12px 0;
`
const TransactionsBack = styled.div`
    float: left;
    padding: 10px 0 0 30px;
    font-size: 1.2rem;
    & a {
        text-decoration: none;
    }
    & a:visited {
        color: ${colors.backgroundColor};
    }
    & i {
        margin-right: 12px;
    }
`
const TransactionsSrOnly = styled.h2`
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
const TransactionsDiv = styled.div`
    padding-top: 5rem;
    background-color: ${colors.backgroundColor};
    padding-bottom: 2rem;
`

const TransactionsWrapper = styled.div`
    margin: auto;
    padding: 0 8rem;
`
const TransactionsColumnTitle = styled.div`
    display: grid;
    grid-template-columns: 0fr 4fr 5fr 5fr 4fr;
    font-weight: bold;
    padding: 0 24px;
`
const TransactionsColumn = styled.p`
    font-size: 0.7rem;
    text-align: center;
`