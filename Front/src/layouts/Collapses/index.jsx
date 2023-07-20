import { useEffect, useState } from "react"
import styled from 'styled-components'
import { Pencil } from "../../components/Icons"
import colors from "../../style/color"
import { CancelDetails, EditButton } from "../../components/Buttons"

function Collapses({ type, category, notes }) {
    const [newCategory, setCategory] = useState(category)
    const [newNotes, setNotes] = useState(notes)
    const [categoryExpanded, setCategoryExpanded] = useState(false)
    const [notesExpanded, setNotesExpanded] = useState(false)

    const handleCategory = () => {
        setCategoryExpanded(!categoryExpanded)
    }
    const updateCategory = () => {
        setCategoryExpanded(!categoryExpanded);
    }
    const handleNotes = () => {
        setNotesExpanded(!notesExpanded);
    }
    const updateNotes = () => {
        setNotesExpanded(!notesExpanded);
    }
    // Get values from Store
    useEffect(() => {
        setCategory(category)
        setNotes(notes)
    }, [category, notes])

    return (
        <TransactionDescription>
            <TransactionType>
                <div>Transaction Type: {type}</div>
            </TransactionType>
            <TransactionCategory>
                <div>Category:&nbsp;</div>
                
                {categoryExpanded ? (
                    <TransactionCategoryInput>
                        <form className="form-horizontal">
                            <input
                                type='text'
                                value={newCategory ?? ''}
                                onChange={e => setCategory(e.target.value)}
                            />
                        </form>
                        <EditFormButton>
                            <EditButton onclick={updateCategory} title="Save" />
                            <CancelDetails onclick={handleCategory} title='Cancel' />
                        </EditFormButton>
                    </TransactionCategoryInput>
                ) : (
                    <TransactionCategoryInput>
                        <div>{newCategory}&nbsp;</div>
                        <TransactionIcon onClick={handleCategory}>
                            <Pencil />
                        </TransactionIcon>
                    </TransactionCategoryInput>
                )}
            </TransactionCategory>
            <TransactionNotes>
                <div>Notes:&nbsp;</div>
                {notesExpanded ? (
                    <TransactionNotesInput>
                        <form className="form-horizontal">
                            <textarea
                                value={newNotes ?? ''}
                                rows="2"
                                cols="20"
                                onChange={e => setNotes(e.target.value)}
                            />
                        </form>
                        <EditFormButton>
                            <EditButton onclick={updateNotes} title="Save" />
                            <CancelDetails onclick={handleNotes} title='Cancel' />
                        </EditFormButton>
                    </TransactionNotesInput>
                ) : (
                    <TransactionNotesInput>
                        <div>{newNotes}&nbsp;</div>
                        <TransactionIcon onClick={handleNotes}>
                            <Pencil />
                        </TransactionIcon>
                    </TransactionNotesInput>
                )}
            </TransactionNotes>
        </TransactionDescription>
    );
}

export default Collapses

const TransactionDescription = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    background-color: ${colors.whiteBackground};
    height: 12vh;
    padding: 2vh 0 0 8vw;
`
const TransactionType = styled.div`
    display: flex;
    flex-direction: row;
    height: 30px;
`
const TransactionCategory = styled.div`
    display: flex;
    flex-direction: row;
    height: 30px;
`
const TransactionIcon = styled.div`
    display: flex;
    flex-direction: row;
    height: 30px;
`
const TransactionNotes = styled.div`
    display: flex;
    flex-direction: row;
    height: 30px;
    align-items: self-start;
`
const TransactionCategoryInput = styled.div`
    display: flex;
    flex-direction: row;
    height: 30px;
`
const TransactionNotesInput = styled.div`
    display: flex;
    flex-direction: row;
    height: 30px;
    & textarea {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-left: 3%;
        flex-wrap: wrap;
        font-weight: bold;
        font-size: 12px;
    }
`
const EditFormButton = styled.div`
    & button {
        width: 82px;
        height: 22px;
        margin-left: 0.5rem;
        padding: 2px;
    }
`