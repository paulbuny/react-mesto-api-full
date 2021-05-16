import React from "react";
import success from "../images/sucess.svg";
import alert from "../images/alert.svg";


function InfoTooltip(props) {
    function handleOnCLose() {
        props.onClose();
    }

    return (
        <div className={props.isOpen ?
            `popup popup_type_${props.name} popup_display_active` : `popup popup_type_${props.name}`}
        >
            <div className="popup__window">
                <img className="popup__info-image"
                     src={props.isSucceed ? success : alert}
                     alt={props.isSucceed ? 'Успех' : 'Ошибка'} />
                <h2 className="popup__title">{props.isSucceed ?
                    'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'
                }</h2>
                <button className="button button__close popup__close"
                        type="button"
                        onClick={handleOnCLose}/>
            </div>
        </div>
    )
}

export default InfoTooltip;