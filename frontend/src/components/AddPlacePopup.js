import {useState} from "react"
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');

    function handleOnNameChange(e) {
        setName(e.target.value);
    }

    function handleOnUrlChange(e) {
        setUrl(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onAddPlace({
            name: name,
            link: url,
        });

        setName('');
        setUrl('');
    }

    return(
        <PopupWithForm title={'Новое место'}
                       name={'add-place'}
                       isOpen={props.isOpen}
                       onClose={props.onClose}
                       onSubmit={handleSubmit}
        >
            <input className="popup__input popup__input_card_place" type="text" name="name" id="card-title"
                   placeholder="Название" minLength="2" maxLength="30" required
                   onChange={handleOnNameChange}
                   value={name}
            />
            <span className="popup__input-error card-title-error"/>
            <input className="popup__input popup__input_card_image" type="url" name="link" id="card-image"
                   placeholder="Ссылка на картинку" required
                   onChange={handleOnUrlChange}
                   value={url}
            />
            <span className="popup__input-error card-image-error"/>
            <button className="button popup__submit" type="submit">Создать</button>
        </PopupWithForm>
    )
}

export default AddPlacePopup;