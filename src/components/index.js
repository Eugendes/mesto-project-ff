import {
  getCards,
  postCard,
  getUser,
  updateAvatar,
  editProfile,
} from "../components/api.js";
import { 
  enableValidation, 
  clearValidation 
} from "../components/validation.js";
import {
  likeActive,
  deleteCard,
  createCard,
  renderCard,
} from "../components/card.js";
import {
  openPopupSlowly,
  closePopupSlowly,
  closePopupOverlay,
} from "../components/modal.js";

import "../styles/index.css";
import logo from "../images/logo.svg";

// @todo: Используем переменные в HTML
document.querySelector(".logo").src = logo;

// @todo: Вывести данные пользователя и карточки на страницу
Promise.all([getUser(), getCards()])
  .then(([userData, cardData]) => {
    const userId = userData._id;
    const profileTitle = document.querySelector(".profile__title");
    const profileDescription = document.querySelector(".profile__description");
    const profileAvatar = document.querySelector(".profile__image");

    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url('${userData.avatar}')`;

    cardData.forEach((item) => {
      const cardElement = createCard(
        {
          cardTitle: item.name,
          cardAlt: item.name,
          cardLink: item.link,
          cardLikeCounter: item.likes,
          cardId: item._id,
          ownerId: item.owner._id,
        },
        deleteCard,
        (evt) => likeActive(evt, item._id),
        openPopupImage,
        userId
      );
      renderCard(cardElement);
    });
  })
  .catch((error) => {
    console.error("Ошибка:", error);
  });

// @todo: Модальные окна
export const popups = {
  edit: document.querySelector(".popup_type_edit"),
  newCard: document.querySelector(".popup_type_new-card"),
  bigCard: document.querySelector(".popup_type_image"),
  newProfile: document.querySelector(".popup_type_avatar_edit"),
};

// @todo: Обработчики открытия попапов
document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => editPopup(popups.edit));
document
  .querySelector(".profile__add-button")
  .addEventListener("click", () => editPopup(popups.newCard));
document
  .querySelector(".profile__avatar-button")
  .addEventListener("click", () => editPopup(popups.newProfile));

// @todo: Функции обработчиков событий закрытия
function handlerListenerOverlay(popup) {
  return function () {
    closePopupSlowly(popup);
  };
}
function handlerListenerEsc(popup) {
  return function (evt) {
    closePopupOverlay(evt, popup);
  };
}

// @todo: Функция для добавления обработчиков событий закрытия
function setupPopupCloseHandlers(popup) {
  popup
    .querySelector(".popup__close")
    .addEventListener("click", handlerListenerOverlay(popup));
  popup.addEventListener("mousedown", handlerListenerEsc(popup));
}

// @todo: Настройка обработчиков событий для всех попапов
Object.values(popups).forEach(setupPopupCloseHandlers);

// Обработчик для формы редактирования профиля
const titleName = document.querySelector(".profile__title");
const titleType = document.querySelector(".profile__description");
const nameInput = popups.edit.querySelector(".popup__input_type_name");
const typeInput = popups.edit.querySelector(".popup__input_type_description");

popups.edit
  .querySelector(".popup__form")
  .addEventListener("submit", function (evt) {
    evt.preventDefault();
    const name = nameInput.value;
    const about = typeInput.value;
    titleName.textContent = name;
    titleType.textContent = about;
    const saveButton = popups.edit.querySelector(".popup__button");
    saveButton.textContent = "Сохранение...";
    saveButton.disabled = true;

    editProfile({ name, about })
      .then(() => {
        closePopupSlowly(popups.edit);
      })
      .finally(() => {
        saveButton.textContent = "Сохранить";
        saveButton.disabled = false;
      });
  });

// Обработчик для формы создания новой карточки
const cardName = popups.newCard.querySelector(".popup__input_type_card-name");
const cardUrl = popups.newCard.querySelector(".popup__input_type_url");

popups.newCard
  .querySelector(".popup__form")
  .addEventListener("submit", function (evt) {
    evt.preventDefault();
    const saveButton = popups.newCard.querySelector(".popup__button");
    saveButton.textContent = "Сохранение...";
    saveButton.disabled = true;

    if (cardName.value && cardUrl.value) {
      const cardElement = {
        cardTitle: cardName.value,
        cardAlt: cardName.value,
        cardLink: cardUrl.value,
      };
      const nameSys = cardName.value;
      const linkSys = cardUrl.value;
      postCard({ name: nameSys, link: linkSys })
        .then((result) => {
          renderCard(
            createCard(
              {
                cardTitle: result.name,
                cardAlt: result.name,
                cardLink: result.link,
                cardLikeCounter: result.likes,
                cardId: result._id,
                ownerId: result.owner._id,
              },
              deleteCard,
              (evt) => likeActive(evt, result._id),
              openPopupImage,
              result.owner._id
            )
          );
          closePopupSlowly(popups.newCard);
        })
        .finally(() => {
          saveButton.textContent = "Сохранить";
          saveButton.disabled = false;
        });
    }
  });

// Обработчик для формы создания нового аватара профиля
const avatarInput = document.querySelector(".popup__input_type_avatar");
const profileImageElement = document.querySelector(".profile__image");

popups.newProfile
  .querySelector(
    ".popup__fhttps://github.com/Eugendes/mesto-project-ff/actionsorm"
  )
  .addEventListener("submit", function (evt) {
    evt.preventDefault();
    const avatarUrl = avatarInput.value;
    const saveButton = popups.newProfile.querySelector(".popup__button");
    saveButton.textContent = "Сохранение...";
    saveButton.disabled = true;
    profileImageElement.style.backgroundImage = `url('${avatarUrl}')`;

    updateAvatar(avatarUrl)
      .then(() => {
        closePopupSlowly(popups.newProfile);
      })
      .finally(() => {
        saveButton.textContent = "Сохранить";
        saveButton.disabled = false;
      });
  });

const cardList = document.querySelector(".places__list");
const bigCard = popups.bigCard;

// @todo: Редактирование карточки
function editPopup(pop) {
  openPopupSlowly(pop);

  // Находим форму внутри ОТКРЫВАЕМОГО попапа
  const form = pop.querySelector(".popup__form");

  if (form && !pop.classList.contains("popup_type_image")) {
    clearValidation(form, {
      submitButtonSelector: ".popup__button",
      inactiveButtonClass: "popup__button_disabled",
    });
  }

  // Инициализируем валидацию для ОТКРЫВАЕМОЙ формы
  enableValidation(
    {
      inputSelector: ".popup__input",
      submitButtonSelector: ".popup__button",
      inactiveButtonClass: "popup__button_disabled",
      errorClass: "popup__error_visible",
    },
    form
  );

  // @todo: Редактирование профиля
  if (pop === popups.edit) {
    const titleName = document.querySelector(".profile__title");
    const titleType = document.querySelector(".profile__description");
    const name = pop.querySelector(".popup__input_type_name");
    const type = pop.querySelector(".popup__input_type_description");
    name.value = titleName.textContent;
    type.value = titleType.textContent;
  }

  // @todo: Создание новой карточки
  if (pop === popups.newCard) {
    const cardName = pop.querySelector(".popup__input_type_card-name");
    const cardUrl = pop.querySelector(".popup__input_type_url");
    const button = popups.newCard.querySelector(".popup__button");
    cardName.value = "";
    cardUrl.value = "";
    button.classList.add("popup__button_disabled");
    button.disabled = false;
  }

  if (pop === popups.newProfile) {
    const avatarUrl = pop.querySelector(".popup__input_type_avatar");
    const button = popups.newProfile.querySelector(".popup__button");
    avatarUrl.value = "";
    button.classList.add("popup__button_disabled");
    button.disabled = false;
  }
}

// @todo: Функция для открытия большого изображения
function openPopupImage(evt) {
  const { src, alt } = evt.target;
  popups.bigCard.querySelector(".popup__image").src = src;
  popups.bigCard.querySelector(".popup__image").alt = alt;
  popups.bigCard.querySelector(".popup__caption").textContent = alt;
  openPopupSlowly(popups.bigCard);
}

// @todo: Функция заполнения текста пользователя и аватара
document.addEventListener("DOMContentLoaded", () => {
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  const profileAvatar = document.querySelector(".profile__image");

  getUser()
    .then(({ name, about, avatar }) => {
      profileTitle.textContent = name;
      profileDescription.textContent = about;
      profileAvatar.style.backgroundImage = `url('${avatar}')`;
    })
    .catch((error) => {
      console.error("Ошибка загрузки данных пользователя:", error);
    });
});
