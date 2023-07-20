import styled from 'styled-components'
import colors from '../../style/color'

export default function Footer({ text }) {
    return (
    <FooterContainer>
        <FooterText>{text}</FooterText>
    </FooterContainer>
    )
}

const FooterContainer = styled.footer`
    display: flex;
    justify-content: center;
    border-top: 2px solid ${colors.gray};
    padding: 2rem 0 1.5rem;
`
const FooterText = styled.p`
    margin: 0;
    padding: 0;
`