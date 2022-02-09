const content = document.querySelector(".content");

export const serverAddress = 'https://mesto.nomoreparties.co/v1/cohort-35';
export const userToken = '96c866eb-92a9-4140-92ff-b1afa5e1671b';

// Константы в секции "Профиль"
export const editButton = content.querySelector(".profile__button-edit");
export const addButton = content.querySelector(".profile__button-add");
export const avatarButton = content.querySelector('.profile__button-avatar');
export const nameSelector = ".profile__name";
export const jobSelector = ".profile__status";
export const avatarSelector = ".profile__avatar";

// Константы в секции "Редактировать профиль"
const popupEdit = document.querySelector(".popup_type_edit-profile");
export const popupEditForm = popupEdit.querySelector(".popup__form");
export const nameInput = popupEditForm.querySelector(".popup__input_info_name");
export const jobInput = popupEditForm.querySelector(".popup__input_info_status");

// Константы в секции "Добавить элемент"
const popupAdd = document.querySelector(".popup_type_add-element");
export const popupAddForm = popupAdd.querySelector(".popup__form");

// Константы в секции "Изменить аватар"
const popupEditAvatar = document.querySelector(".popup_type_edit-avatar");
export const popupEditAvatarForm = popupEditAvatar.querySelector(".popup__form");

// Константы в секции "Удалить карточку"
export const popupDeleteContainer = document.querySelector(".popup_type_delete-card");