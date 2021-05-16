function ImagePopup(props) {

    return(

        <div className={props.isOpen ? `popup popup_type_${props.name} popup_display_active` : `popup popup_type_${props.name}`}>
            <div className="popup__image-viewer">
                <img className="popup__image" src={props.link} alt={props.name}/>
                <p className="popup__caption">{props.name}</p>
                <button className="button button__close popup__close" type="button" onClick={props.onClose}/>
            </div>
        </div>
    )

}

export default ImagePopup;