import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../style/color'
import { EditButton } from '../../components/Buttons'

export default function Accounts({ accountTitle, accountAmount, accountAmountDescription }) {
    const navigate = useNavigate()
    
    function consultAccount() {
        navigate(`transactions`)
    }
    return (
        <AccountsSection>
            <AccountContentWrapper>
                <AccountTitle>{accountTitle}</AccountTitle>
                <AccountAmount>{accountAmount}</AccountAmount>
                <AccountAmountDescription>{accountAmountDescription}</AccountAmountDescription>
            </AccountContentWrapper>
            <AccountContentWrapperCta>
                <EditButton onclick={consultAccount} title="View transactions" />
            </AccountContentWrapperCta>
        </AccountsSection>
    )
}

const AccountsSection = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid ${colors.backgroundColor};
    background-color: ${colors.whiteBackground};
    width: 80%;
    margin: 0 auto;
    flex-direction: column;
    padding: 1.5rem;
    text-align: center;
    box-sizing: border-box;
    margin-bottom: 2rem;
    @media (min-width: 720px) {
        flex-direction: row;
        text-align: left;
    }
`
const AccountContentWrapper = styled.div`
    width: 100%;
    flex: 1;
`
const AccountTitle = styled.h3`
    margin: 0;
    padding: 0;
    font-size: 1rem;
    font-weight: normal;
`
const AccountAmount = styled.p`
    margin: 0;
    font-size: 2.5rem;
    font-weight: bold;
`
const AccountAmountDescription = styled.p`
    margin: 0;
`
const AccountContentWrapperCta = styled.div`
    width: 100%;
    flex: 1;
    @media (min-width: 720px) {
        flex: 0;
    }
    & button {
        font-size: 1.1rem;
        @media (min-width: 720px) {
            width: 200px;
        }
    }
`