// @todo: Импортируем файлы .js и .css
import { initialCards, createCard, renderCard } from "../components/cards.js";
import {
  openPopupSlowly,
  closePopupButton,
  closePopupElse,
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
  const cardElement = createCard({
    cardTitle: item.name,
    cardAlt: item.alt,
    cardLink: item.link,
  });
  renderCard(cardElement);
});

// @todo: Модальные окна
export const popups = {
  edit: document.querySelector(".popup_type_edit"),
  newCard: document.querySelector(".popup_type_new-card"),
  bigCard: document.querySelector(".popup_type_image"),
};

// @todo: Функция редактирования попапа
function editPopup(pop) {
  pop.style.display = "flex";

  openPopupSlowly(pop);

  if (pop === popups.edit) {
    const titleName = document.querySelector(".profile__title");
    const titleType = document.querySelector(".profile__description");
    const name = pop.querySelector(".popup__input_type_name");
    const type = pop.querySelector(".popup__input_type_description");

    name.value = titleName.textContent;
    type.value = titleType.textContent;

    pop.querySelector(".popup__button").addEventListener("click", (evt) => {
      evt.preventDefault();
      titleName.textContent = name.value;
      titleType.textContent = type.value;
      closePopupButton(pop);
    });
  }

  if (pop === popups.newCard) {
    const cardName = pop.querySelector(".popup__input_type_card-name");
    const cardUrl = pop.querySelector(".popup__input_type_url");

    pop.querySelector(".popup__button").addEventListener("click", (event) => {
      event.preventDefault();
      if (cardName.value && cardUrl.value) {
        const cardElement = {
          cardTitle: cardName.value,
          cardAlt: cardName.value,
          cardLink: cardUrl.value,
        };
        renderCard(createCard(cardElement));
        closePopupButton(pop);
      }
    });
  }
}

// @todo: Функция для добавления обработчиков событий закрытия
function setupPopupCloseHandlers(popup) {
  popup
    .querySelector(".popup__close")
    .addEventListener("click", () => closePopupButton(popup));
  popup.addEventListener("mousedown", (evt) => closePopupElse(evt, popup));
}

// @todo: Настройка обработчиков событий для всех попапов
Object.values(popups).forEach(setupPopupCloseHandlers);

// @todo: Обработчики открытия попапов
document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => editPopup(popups.edit));
document
  .querySelector(".profile__add-button")
  .addEventListener("click", () => editPopup(popups.newCard));

// @todo: Обработчик для закрытия попапов с клавиатуры
document.addEventListener("keydown", (evt) => {
  Object.values(popups).forEach((popup) => closePopupElse(evt, popup));
});

const cardList = document.querySelector(".places__list");
const bigCard = popups.bigCard;

// @todo: Установка обработчика для кнопок закрытия
popups.bigCard
  .querySelector(".popup__close")
  .addEventListener("click", () => closePopupButton(bigCard));
popups.bigCard.addEventListener("mousedown", (evt) =>
  closePopupElse(evt, bigCard)
);

// @todo: Обработчик для открытия большого изображения
cardList.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("card__image")) {
    popupImage(evt);
  }
});

// @todo: Функция для открытия большого изображения
function popupImage(evt) {
  const { src, alt } = evt.target;
  popups.bigCard.querySelector(".popup__image").src = src;
  popups.bigCard.querySelector(".popup__image").alt = alt;
  popups.bigCard.querySelector(".popup__caption").textContent = alt;
  openPopupSlowly(popups.bigCard);
  popups.bigCard.style.display = "flex";
}
