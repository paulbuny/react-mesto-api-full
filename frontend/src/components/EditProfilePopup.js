import {useState, useEffect, useContext} from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const currentUser = useContext(CurrentUserContext);

    function handleOnNameChange(e) {
        setName(e.target.value);
    }

    function handleOnDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault(); //?

        props.onUpdateUser({
            name,
            about: description,
        })
    }

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    return (
        <PopupWithForm title={'Редактировать профиль'}
                       name={'edit-profile'}
                       onClose={props.onClose}
                       isOpen={props.isOpen}
                       onSubmit={handleSubmit}
        >
            <input className="popup__input popup__input_profile_name" type="text" name="name" minLength="2" maxLength="40" required
                   value={name}
                   onChange={handleOnNameChange}
            />
            <span className="popup__input-error profile-name-error"/>
            <input className="popup__input popup__input_profile_job" type="text" name="about" minLength="2" maxLength="200" required
                   value={description}
                   onChange={handleOnDescriptionChange}
            />
            <span className="popup__input-error profile-text-error"/>
            <button className="button popup__submit" type="submit">Сохранить</button>
        </PopupWithForm>
    )
}

export default EditProfilePopup