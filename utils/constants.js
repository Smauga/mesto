const content = document.querySelector(".content");

// Константы в секции "Профиль"
export const editButton = content.querySelector(".profile__button-edit");
export const addButton = content.querySelector(".profile__button-add");
export const nameProfile = content.querySelector(".profile__name");
export const jobProfile = content.querySelector(".profile__status");

// Константы в секции "Редактировать профиль"
const popupEdit = document.querySelector(".popup_type_edit-profile");
export const popupEditForm = popupEdit.querySelector(".popup__form");
export const nameInput = popupEditForm.querySelector(".popup__input_info_name");
export const jobInput = popupEditForm.querySelector(".popup__input_info_status");

// Константы в секции "Добавить элемент"
const popupAdd = document.querySelector(".popup_type_add-element");
export const popupAddForm = popupAdd.querySelector(".popup__form");