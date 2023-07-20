import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { initProfile } from "../../features/usersSlice"
import styled from 'styled-components'
import Hero from "../../components/Hero"
import Features from "../../components/Features"
import { infoHero, infoFeatures } from "../../data/infos"

export default function Home() {
    const dispatch = useDispatch()
    
    // Initiate user profile
    useEffect(() => {
        dispatch(initProfile())
    })

    return (
        <main>
            <Hero
                bgImage={infoHero.bgImage}
                title={infoHero.title}
                subtitle1={infoHero.subtitle1}
                subtitle2={infoHero.subtitle2}
                subtitle3={infoHero.subtitle3}
                text={infoHero.text}
            />
            <FeaturesSection>
                <FeaturesSrOnly>Features</FeaturesSrOnly>
                {infoFeatures.map((element) => (
                    <Features 
                        element={element}
                        key={element.id}
                        image={element.img}
                        alt={element.alt}
                        title={element.title}
                        text={element.text}
                    />
                ))}
            </FeaturesSection>
        </main>
    )
}

const FeaturesSection = styled.section`
    display: flex;
    flex-direction: column;
    @media (min-width: 920px) {
          flex-direction: row;
    }
`
const FeaturesSrOnly = styled.h2`
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