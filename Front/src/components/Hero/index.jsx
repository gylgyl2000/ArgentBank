import styled from 'styled-components'

export default function Hero(props) {
    return (
        <HeroDiv style={{ backgroundImage: "url(" + props.bgImage + ")" }}>
            <HeroContent>
                <HeroSrOnly>{props.title}</HeroSrOnly>
                <HeroContentSubtitle>{props.subtitle1}</HeroContentSubtitle>
                <HeroContentSubtitle>{props.subtitle2}</HeroContentSubtitle>
                <HeroContentSubtitle>{props.subtitle3}</HeroContentSubtitle>
                <HeroContentText>{props.text}</HeroContentText>
            </HeroContent>
        </HeroDiv>
    )
}

const HeroDiv = styled.div`
    background-position: 0 -50px;
    background-size: cover;
    background-repeat: no-repeat;
    height: 300px;
    position: relative;
    @media (min-width: 920px) {
        height: 400px;
        background-position: 0% 33%;
    }
`
const HeroContent = styled.section`
    position: relative;
    top: 2rem;
    width: 200px;
    background: white;
    padding: 2rem;
    text-align: left;
    margin: 0 auto;
    @media (min-width: 920px) {
        position: absolute;
        top: 50px;
        right: 50px;
        width: 300px;
        margin: 2rem;
    }
`
const HeroSrOnly = styled.h2`
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
const HeroContentSubtitle = styled.p`
    font-weight: bold;
    font-size: 1rem;
    margin: 0;
    @media (min-width: 920px) {
        font-size: 1.5rem;
    }
`
const HeroContentText = styled.p`
    margin-bottom: 0;
    font-size: 0.9rem;
    @media (min-width: 920px) {
        font-size: 1.2rem;
    }
`