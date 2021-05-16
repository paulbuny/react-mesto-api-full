import {useContext} from 'react';
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main(props) {
    const currentUser = useContext(CurrentUserContext);

    return (

        <main className="content">

            <section className="profile">
                <div className="profile__avatar-wrapper" style={{backgroundImage: `url(${currentUser.avatar})`}} >
                    <button className="button profile__edit-image" onClick={props.onEditAvatar}/>
                </div>
                <div className="profile__wrapper">
                    <div className="profile__info">
                        <h1 className="profile__info-title">{currentUser.name}</h1>
                        <p className="profile__info-text">{currentUser.about}</p>
                    </div>
                    <button className="button profile__edit" type="button" onClick={props.onEditProfile}/>
                </div>
                <button className="button profile__add" type="button" onClick={props.onAddPlace}/>
            </section>

            <section>
                <ul className="cards">
                    {
                        props.cards.map((item) => (
                            <Card
                                key={item._id}
                                name={item.name}
                                link={item.link}
                                likes={item.likes}
                                id={item._id}
                                onCardClick={props.onCardClick}
                                card={item}
                                onCardLike={props.onCardLike}
                                onCardDelete={props.onCardDelete}
                            />
                        )
                        )}
                </ul>
            </section>
        </main>

    )
}

export default Main;