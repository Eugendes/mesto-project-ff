// @todo: Импортируем файлы .js и .css
import { initialCards } from "../components/cards.js";
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

// @todo: Импортируем изображения для HTML
import logo from "../images/logo.svg";
import avatar from "../images/avatar.jpg";

// @todo: Используем переменные в HTML
document.querySelector(".logo").src = logo;
document.querySelector(
  ".profile__image"
).style.backgroundImage = `url(${avatar})`;

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  const cardElement = createCard(
    {
      cardTitle: item.name,
      cardAlt: item.alt,
      cardLink: item.link,
    },
    deleteCard,
    likeActive,
    openPopupImage
  );
  renderCard(cardElement);
});

// @todo: Модальные окна
export const popups = {
  edit: document.querySelector(".popup_type_edit"),
  newCard: document.querySelector(".popup_type_new-card"),
  bigCard: document.querySelector(".popup_type_image"),
};

// @todo: Обработчики открытия попапов
document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => editPopup(popups.edit));
document
  .querySelector(".profile__add-button")
  .addEventListener("click", () => editPopup(popups.newCard));

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
    titleName.textContent = nameInput.value;
    titleType.textContent = typeInput.value;
    closePopupSlowly(popups.edit);
  });

// Обработчик для формы создания новой карточки
const cardName = popups.newCard.querySelector(".popup__input_type_card-name");
const cardUrl = popups.newCard.querySelector(".popup__input_type_url");

popups.newCard
  .querySelector(".popup__form")
  .addEventListener("submit", function (evt) {
    evt.preventDefault();
    if (cardName.value && cardUrl.value) {
      const cardElement = {
        cardTitle: cardName.value,
        cardAlt: cardName.value,
        cardLink: cardUrl.value,
      };
      renderCard(
        createCard(cardElement, deleteCard, likeActive, openPopupImage)
      );
      closePopupSlowly(popups.newCard);
    }
  });

const cardList = document.querySelector(".places__list");
const bigCard = popups.bigCard;

// @todo: Редактирование карточки
function editPopup(pop) {
  openPopupSlowly(pop);
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
    cardName.value = "";
    cardUrl.value = "";
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
