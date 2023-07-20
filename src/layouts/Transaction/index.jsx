import { useState } from "react"
import styled from 'styled-components'
import Collapses from "../Collapses"
import colors from "../../style/color"
import { AngleDown, AngleUp } from "../../components/Icons"

export default function Transaction({ data }) {
    const { type, category, notes } = data.details
    const [expanded, setExpanded] = useState(false)
    const classToggle = () => {
        setExpanded(!expanded)
    }

    return (
        <>
            <TransactionLine onClick={classToggle}>
                <div>{expanded ? <AngleUp /> : <AngleDown />}</div>
                <div>{data.date}</div>
                <div>{data.description}</div>
                <div>{data.amount}</div>
                <div>{data.balance}</div>
            </TransactionLine>
            {expanded && <Collapses type={type} category={category} notes={notes} />}
        </>
    )
}

const TransactionLine = styled.div`
    background-color: ${colors.whiteBackground};
    border: 1px solid ${colors.gray};
    padding: 10px 24px;
    font-size: 1rem;
    display: grid;
    grid-template-columns: 0fr 4fr 5fr 5fr 4fr;
    font-weight: bold;
    place-items: center;
    & i {
        font-size: 26px;
        font-weight: bold;
    }
`