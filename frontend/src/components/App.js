import {useState, useEffect} from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup"
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from "../utils/api";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Route, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import auth from "../utils/auth";
import InfoTooltip from "./InfoTooltip";

function App() {
    //Стейт переменная Поп-апа Аватара
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

    //Стейт переменная Поп-апа редактирования Профиля
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

    //Стейт переменная Поп-апа добавления нового места
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

    //Стейт переменная карточки по клику
    const [selectedCard, setSelectedCard] = useState({
        isOpen: false,
        name: '',
        link: '',
    });

    //Стейт переменная текущего пользователя
    const [currentUser, setCurrentUser ] = useState({
        name: '',
        about: '',
        avatar: '',
    });

    //Стейт переменная email пользователя
    const [userEmail, setUserEmail] = useState('');

    //Стейт переменна информирующего поп-апа
    const [infoTooltip, setInfoTooltip] = useState({
        isOpen: false,
        isSucceed: false,
    });

    //Стейт переменна массива карточек
    const [cards, setCards] = useState([]);

    //Стейт переменная статуса авторизации пользователя
    const [loggedIn, setLoggedIn] = useState(false);

    //Стейт переменная localStorage
    const [token, setToken] = useState(`Bearer ${localStorage.getItem('token')}`);

    //Переменная с логами истории
    let history = useHistory(true);

    //Получение данных о пользователе с сервера
    useEffect(() => {
        api.getUserInformation(token)
            .then((data) => {
                setCurrentUser(data);
            })
            .catch(console.error)
    }, [token])

    //Получение массива карточек с сервера
    useEffect(() => {
        api.getInitialCards(token)
            .then((cards) => setCards(cards.reverse()))
            .catch(console.error)
    }, [token]);

    //Функция проверки токена пользователя
    function checkToken() {
        const token = localStorage.getItem('token');
        if (token) {
            auth.getToken(token)
                .then((res) => {
                    setUserEmail(res.email);
                    if (res) {
                        setLoggedIn(true);
                    }
                })
                .catch(console.error);
        }
    }

    //Вызов проверки токена пользователя
    useEffect(() => {
            checkToken();
            if (loggedIn) {
                history.push('/')
            }
    }, [history, loggedIn]);

    //Функция "разлогинивания" текущего пользователя при выходе из системы
    function handleLogOut() {
        localStorage.removeItem('token');
        setUserEmail('');
        setLoggedIn(false);
    }

    //Функция авторизации пользователя
    function handleSignIn(email, password) {
        auth.signIn(email, password)
            .then((res) => {
              if (res) {
                localStorage.setItem('token', res);
                setUserEmail(email);
                setToken(`Bearer ${res}`);
                setLoggedIn(true);

                history.push('/');
              } else {
                setInfoTooltip({
                  isOpen: true,
                  isSucceed: false,
              })
              }
            })
            .catch(() => {
                setInfoTooltip({
                    isOpen: true,
                    isSucceed: false,
                })
            })
    }

    //Функция регистрации нового пользователя
    function handleSignUp(email, password) {
        auth.signUp(email, password)
            .then(() => {
                history.push('/sign-in');
                setInfoTooltip({
                    isOpen: true,
                    isSucceed: true,
                });
            })
            .catch(() => {
                setInfoTooltip({
                    isOpen: true,
                    isSucceed: false,
                })
            })
    }

    //Функция обработки Лайка карточки
    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked, token)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
            })
            .catch(console.error);
    }

    //Функция обработки удаления карточки
    function handleDeleteCard(card) {
        api.deleteCard(card._id, token)
            .then(() => {
                setCards((state) => state.filter((res) => res !== card))
            })
            .catch(console.error)
    }


    //Функция обработчика клика по кнопке редактирования аватара
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    //Функция обработчика клика по кнопке редактирования профиля
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    //Функция обработчика клика по кнопке добавления нового места
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    //Функция обработчика клика по изображению в карточке
    function handleCardClick(props) {
        setSelectedCard({
            isOpen: true,
            link: props.link,
            name: props.name,
        });
    }

    //Функция обработчика клика по кнопке закрытия поп-апа
    function closeAllPopups() {

        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard({isOpen: false});
        setInfoTooltip({isOpen: false});
    }

    //Функция обновления данных пользователя
    function handleUpdateUser(data) {
        api.saveUserInformation({name: data.name, about: data.about, token: token})
            .then((res) => setCurrentUser(res))
            .catch(console.error)
            .finally(() => closeAllPopups());
    }

    //Функция обновления аватара пользователя
    function handleUpdateAvatar(data) {
        api.changeUserAvatar(data.avatar, token)
            .then((res) => setCurrentUser(res))
            .catch(console.error)
            .finally(() => closeAllPopups())
    }

    //Функция добавления новой карточки
    function handleAddPlaceSubmit(data) {
        api.addNewCard({name: data.name, link: data.link, token: token})
            .then((newCard) => setCards([newCard, ...cards]))
            .catch(console.error)
            .finally(()=>closeAllPopups())
    }

    return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={userEmail} loggedIn={loggedIn} handleLogOut={handleLogOut} />
          <Switch>
              <ProtectedRoute exact path='/'
                              component={Main}
                              loggedIn={loggedIn}
                              onEditProfile={handleEditProfileClick}
                              onAddPlace={handleAddPlaceClick}
                              onEditAvatar={handleEditAvatarClick}
                              onCardClick={handleCardClick}
                              cards={cards}
                              onCardLike={handleCardLike}
                              onCardDelete={handleDeleteCard}
              />
              <Route path='/sign-up'>
                  <Register handleSignUp={handleSignUp}/>
              </Route>

              <Route path='/sign-in'>
                  <Login handleSignIn={handleSignIn}/>
              </Route>

          </Switch>

        <Footer />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                         onClose={closeAllPopups}
                         onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup isOpen={isEditProfilePopupOpen}
                          onClose={closeAllPopups}
                          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup isOpen={isAddPlacePopupOpen}
                       onClose={closeAllPopups}
                       onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup isOpen={selectedCard.isOpen}
                    name={selectedCard.name}
                    link={selectedCard.link}
                    onClose={closeAllPopups}
        />
        </div>

        <InfoTooltip isOpen={infoTooltip.isOpen}
                     onClose={closeAllPopups}
                     isSucceed={infoTooltip.isSucceed}
        />
    </CurrentUserContext.Provider>
  );

}

export default App;
