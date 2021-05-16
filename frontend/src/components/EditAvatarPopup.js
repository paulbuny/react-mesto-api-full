import {useRef} from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const avatarRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm title={'Обновить аватар'}
                       name={'edit-avatar'}
                       isOpen={props.isOpen}
                       onClose={props.onClose}
                       onSubmit={handleSubmit}
        >
            <input className="popup__input popup__input_profile_avatar" type="url" name="avatar" id="profile-avatar" minLength="2" required ref={avatarRef}/>
            <span className="popup__input-error profile-avatar-error"/>
            <button className="button popup__submit" type="submit">Сохранить</button>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;