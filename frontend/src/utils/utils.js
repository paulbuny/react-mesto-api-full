    // Элементы и селекторы профиля пользователя
const editAvatarButton = document.querySelector('.profile__edit-image');
const editProfileButton = document.querySelector('.profile__edit');
const profileName = '.profile__info-title';
const profileJob = '.profile__info-text';
const profileAvatar = '.profile__avatar';

    //P op-up элементы редактирования профиля
const profileForm = document.querySelector('.pop-up__edit-profile');
const popupProfileSelector = '.pop-up_edit-profile';
const popupInputName = profileForm.querySelector('.pop-up__input_profile_name');
const popupInputJob = profileForm.querySelector('.pop-up__input_profile_job');
const popupUpdateAvatar = '.pop-up_update-avatar';
const profileAvatarForm = document.querySelector('.pop-up__update-avatar');
const popupInputAvatar = profileAvatarForm.querySelector('.pop-up__input_profile_avatar');

    // Pop-up элементы добавления новой карточки "места"
const popupCardForm = document.querySelector('.pop-up__card-form');
const popupConfirmDeleteSelector = '.pop-up_confirm';
const popupCardSelector = '.pop-up_new-card';
const popupCardImage = '.pop-up_card-image';
const cardTemplateSelector = '.card-template';

    // Элементы добавления карточек
const addCardButton = document.querySelector('.profile__add');
const cardsContainer = '.cards';

    // Настройки валидации
const validationConfig = {
    formSelector: '.pop-up__form',
    inputSelector: '.pop-up__input',
    submitButtonSelector: '.pop-up__submit',
    inactiveButtonClass: 'pop-up__submit_disabled',
    inputErrorClass: 'pop-up__input_type_error',
    errorClass: 'pop-up__error_visible'
};

export {
    editAvatarButton,
    editProfileButton,
    profileName,
    profileJob,
    profileAvatar,
    popupUpdateAvatar,
    profileAvatarForm,
    popupInputAvatar,
    profileForm,
    popupProfileSelector,
    popupInputName,
    popupInputJob,
    popupCardForm,
    popupConfirmDeleteSelector,
    popupCardSelector,
    popupCardImage,
    cardTemplateSelector,
    addCardButton,
    cardsContainer,
    validationConfig,
};