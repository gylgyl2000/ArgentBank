import styled from 'styled-components'
import EditNameForm from '../../layouts/EditNameForm'
import colors from '../../style/color'

export default function UserHero({ message, firstName, lastName }) {
    
    return (
        <UserHeroHeader>
            <USerTitle>{message}<br />{firstName} {lastName}!</USerTitle>
            <EditNameForm />
        </UserHeroHeader>
    )
}

const UserHeroHeader = styled.div`
    color: ${colors.secondary};
    margin-bottom: 2rem;
    text-align: center;
`
const USerTitle = styled.h1`
    color: ${colors.secondary};
`