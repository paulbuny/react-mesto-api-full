import {useContext} from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card(props) {
    const currentUser = useContext(CurrentUserContext);

    const isOwn = props.card.owner._id === currentUser._id;

    const cardDeleteButtonClassName = (
        `card__delete ${isOwn ? `card__delete_visible` : `card__delete_hidden`}`
    );

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = `card__like_active`;

    //Коллбэк функция по клику на изображение карточки
    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    return(
        <div className="card-template">
            <li className="card">
                <button
                    className={`button ${cardDeleteButtonClassName}`}
                    type="button"
                    onClick={handleDeleteClick}
                />
                <img className="card__image" src={props.link} alt={props.name} onClick={handleClick}/>
                <div className="card__text">
                    <h2 className="card__title">{props.name}</h2>
                    <div className="card__like-wrapper">
                        <button
                            className={`button card__like ${isLiked ? cardLikeButtonClassName : ''}`}
                            type="button"
                            onClick={handleLikeClick}
                        />
                        <span className="card__like-counter">{props.likes.length}</span>
                    </div>
                </div>
            </li>
        </div>
    )
}

export default Card;