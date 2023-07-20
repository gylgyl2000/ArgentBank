import styled from 'styled-components'
import colors from '../../style/color'

const EditButton = ({ title, onclick }) => {
    return (
        <EditBtn
            type="button"
            onClick={onclick}
        >
            {title}
        </EditBtn>
    )
}
const SubmitButton = ({ value, title }) => {
    return (
        <EditBtn
            type="submit"
            value={value}
        >
            {title}
        </EditBtn>
    )

}
const CancelButton = ({ value, title }) => {
    return (
        <CancelBtn
            value={value}
        >
            {title}
        </CancelBtn>
    )
}
const CancelDetails = ({ title, onclick }) => {
    return (
        <CancelBtn
            type="button"
            onClick={onclick}
            value={title}
        >
            {title}
        </CancelBtn>
    )
}
const EditBtn = styled.button`
    width: max-content;
    border-color: ${colors.green};
    background-color: ${colors.green};
    color: ${colors.secondary};
    font-weight: bold;
    padding: 10px;
    cursor: pointer;
    &:hover {
        cursor: pointer;
        border-color: ${colors.greenHover};
        background-color: ${colors.greenHover};
    }
`
const CancelBtn = styled.button`
    width: max-content;
    border-color: ${colors.red};
    background-color: ${colors.red};
    color: ${colors.secondary};
    font-weight: bold;
    padding: 10px;
    cursor: pointer;
    &:hover {
        cursor: pointer;
        border-color: ${colors.redHover};
        background-color: ${colors.redHover};
    }
`
export { EditButton, SubmitButton, CancelButton, CancelDetails }