import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateUserProfile } from '../../features/usersSlice'
import { userInfosSelector } from '../../utils/selectors'
import styled from 'styled-components'
import colors from '../../style/color'
import { CancelButton, EditButton, SubmitButton } from '../../components/Buttons'

export default function EditNameForm() {
    const dispatch = useDispatch()
    const profileForm = useRef(null)
    const token = sessionStorage.ARGENTBANK_token
    let { firstName, lastName, email } = useSelector(state => userInfosSelector(state))

    function updateProfile(e) {
        e.preventDefault()
        closeProfileForm()
        const values = {
            firstName: firstName,
            lastName: lastName,
            email: email
        }
        Object.values(e.target).forEach((obj, index) => {
            if (obj.value === undefined) {
                return
            }
            if (obj.value !== "") {
                values[Object.keys(values)[index]] = Object.values(e.target)[index].value
            }
        })
        dispatch(updateUserProfile(token, values))
    }
    function showProfileForm() {
        profileForm.current.style.zIndex = '100'
        profileForm.current.style.opacity = '1'
      }
    function closeProfileForm() {
        profileForm.current.style.zIndex = '-100'
        profileForm.current.style.opacity = '0'
      }

    return (
        <>
            <EditButton  title='Edit Name' onclick={showProfileForm} />
            <ProfileSection ref={profileForm}>
                <ProfileForm onSubmit={e => updateProfile(e)}>
                    <ProfileWrapper>
                        <label htmlFor="firstName"></label>
                        <input
                            type="text"
                            id="firstName"
                            placeholder={firstName}
                        />
                        <label htmlFor="lastName"></label>
                        <input
                            type="text"
                            id="lastName"
                            placeholder={lastName}
                        />
                        <br />
                        <SubmitButton value='Save' title="Save" />
                        <CancelButton value='Cancel' title="Cancel" />
                    </ProfileWrapper>
                </ProfileForm>
            </ProfileSection>
        </>
    )
}

const ProfileSection = styled.section`
    position: absolute;
    top: 120px;
    display: flex;
    flex-direction: column;
    width: 100%;
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${colors.backgroundColor};
    padding: 11px 0;
    color: ${colors.secondary};
    z-index: -100;
    opacity: 0;
    transition: .5s ease-out;
    & label {
        margin-top: 15px;
    }
    `
const ProfileWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    
    & input {
        width: 180px;
        height: 31px;
    }
    @media (min-width: 790px) {
        gap: 10px;
    }
    & button {
        width: 90px;
        margin: 5px;
        padding: 5px;
        @media (min-width: 790px) {
            width: 120px;
        }
    }
`
const ProfileForm = styled.form`
    width: 280px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media (min-width: 790px) {
        width: 410px;
    }
`