import styled from 'styled-components'
import colors from '../../style/color'

export default function Features({ image, alt, title, text }) {
    return (
        <FeatureItem>
            <FeatureIcon src={image} alt={alt} />
            <FeatureItemTitle>{title}</FeatureItemTitle>
            <p>{text}</p>
        </FeatureItem>
    )
}

const FeatureItem = styled.div`
    flex: 1;
    padding: 2.5rem;
    text-align: center;
`
const FeatureIcon = styled.img`
    width: 100px;
    border: 10px solid ${colors.green};
    border-radius: 50%;
    padding: 1rem;
`
const FeatureItemTitle = styled.h3`
    color: ${colors.black};
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
`