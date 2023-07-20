import styled from 'styled-components'

import piggy from '../../assets/broken-piggy.png'

export default function Error404() {
    return (
        <Error404Main>
            <Error404Text>
                Oh no! This page seems not to exist...
            </Error404Text>
            <Error404Image src={piggy} alt='error' />
        </Error404Main>
    )
}

const Error404Main = styled.div`
    flex: 1;
    position: relative;
    text-align: center;
`
const Error404Text = styled.div`
    margin-top: 10%;
    font-size: 3vw;
    font-weight: 600;
`
const Error404Image = styled.img`
    width: 60%;
    max-width: 840px;
`