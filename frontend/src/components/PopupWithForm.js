function PopupWithForm(props) {

    function handleClosePopupClick() {
        props.onClose();
    }

    return(
        <>
            <div className={props.isOpen? `popup popup_type_${props.name} popup_display_active` : `popup popup_type_${props.name}`}>
                <div className="popup__window">
                    <h2 className="popup__title">{props.title}</h2>
                    <form className="popup__form" name={props.name} noValidate onSubmit={props.onSubmit}>
                        {props.children}
                    </form>
                    <button className="button button__close popup__close" type="button" onClick={handleClosePopupClick}/>
                </div>
            </div>
    </>
    )
}

export default PopupWithForm;