// @todo: Импортируем файлы .js и .css
import { initialCards } from "../components/cards.js";
import { 
  likeActive,
  deleteCard,
  createCard,
  renderCard
} from "../components/card.js";
import {
  openPopupSlowly,
  closePopupSlowly,
  closePopupEsc,
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
  const cardElement = createCard({
    cardTitle: item.name,
    cardAlt: item.alt,
    cardLink: item.link,
  },
  deleteCard,
  likeActive,
  openPopupImage,
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
document.querySelector(".profile__edit-button").addEventListener("click", () => editPopup(popups.edit));
document.querySelector(".profile__add-button").addEventListener("click", () => editPopup(popups.newCard));

// @todo: Функция для добавления обработчиков событий закрытия
function setupPopupCloseHandlers(popup) {
  popup
    .querySelector(".popup__close")
    .addEventListener("click", () => closePopupSlowly(popup));
  popup.addEventListener("mousedown", (evt) => closePopupOverlay(evt, popup));
}

// @todo: Настройка обработчиков событий для всех попапов
Object.values(popups).forEach(setupPopupCloseHandlers);

const cardList = document.querySelector(".places__list");
const bigCard = popups.bigCard;

// @todo: Установка обработчика для кнопок закрытия
popups.bigCard
  .querySelector(".popup__close")
  .addEventListener("click", () => closePopupSlowly(bigCard));
popups.bigCard.addEventListener("mousedown", (evt) =>
  closePopupOverlay(evt, bigCard)
);

// @todo: Редактирование карточки
function editPopup(pop) {
  openPopupSlowly(pop);

  // @todo: Редактирование карточки
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
      closePopupSlowly(pop);
    });
  }

  // @todo: Создание карточки
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
        renderCard(createCard(cardElement, deleteCard, likeActive, openPopupImage));
        closePopupSlowly(pop);
      }
    });
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


////////////////////////////////////////CARD.JS
// @todo: Темплейт карточки
const templateCard = document.querySelector("#card-template").content;
const templateList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(cardData, deleteCardCallback, likeCallback, openImageCallback) {
  const { cardTitle, cardAlt, cardLink } = cardData;
  const templateElement = templateCard.querySelector(".card").cloneNode(true);
  templateElement.querySelector(".card__title").textContent = cardTitle;
  templateElement.querySelector(".card__image").alt = cardAlt;
  templateElement.querySelector(".card__image").src = cardLink;

  templateElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCardCallback);

  templateElement
    .querySelector(".card__like-button")
    .addEventListener("click", likeCallback);
  
  templateElement
    .querySelector(".card__image")
    .addEventListener("click", openImageCallback);

  return templateElement;
}

// @todo: Функция рендеринга карточки
function renderCard(cardElement) {
  templateList.prepend(cardElement);
}

// @todo: Установка обработчика для кнопок лайков
function likeActive(evt) {
  const button = evt.target.classList;
  if (button.value.includes('is-active')){
    button.remove('card__like-button_is-active');
  } else {
    button.add('card__like-button_is-active');
  }
}

// @todo: Функция удаления карточки
function deleteCard(event) {
  const card = event.target.closest(".card");
  if (card) {
    card.remove();
  }
}

export { likeActive, deleteCard, createCard, renderCard };


///////////////////////////////////////////////////////////MODAL.JS
import { popups } from "../components/index.js";

// @todo: Функция плавного открытия попапа
function openPopupSlowly(pop) {
  pop.classList.add("popup_is-animated");
  setTimeout(() => {
    pop.classList.add("popup_is-opened");
  }, 0);
  pop.querySelectorAll("input").forEach((input) => (input.value = ""));
  
  // @todo: Обработчик для закрытия попапов с клавиатуры
  document.addEventListener("keydown", (evt) => {
    Object.values(popups).forEach((popup) => closePopupEsc(evt, popup));
  });

  // @todo: Установка обработчика для кнопок закрытия
  popups.bigCard
    .querySelector(".popup__close")
    .addEventListener("click", () => closePopupSlowly(popups.bigCard));
  popups.bigCard.addEventListener("mousedown", (evt) =>
    closePopupOverlay(evt, popups.bigCard)
  );
}

// @todo: Функция плавного закрытия попапа
function closePopupSlowly(pop) {
  pop.classList.remove("popup_is-opened");
  setTimeout(() => {
    pop.classList.remove("popup_is-animated");
  }, 500);
  document.querySelector(".profile__edit-button").removeEventListener("click", () => editPopup(popups.edit));
  document.querySelector(".profile__add-button").removeEventListener("click", () => editPopup(popups.newCard));
  document.removeEventListener("keydown", (evt) => {Object.values(popups).forEach((popup) => closePopupEsc(evt, popup));
  popups.bigCard.querySelector(".popup__close").removeEventListener("click", () => closePopupSlowly(popups.bigCard));
  popups.bigCard.removeEventListener("mousedown", (evt) => closePopupOverlay(evt, popups.bigCard));
  pop.querySelector(".popup__button").removeEventListener("click", listenerEditPop);
  pop.querySelector(".popup__button").removeEventListener("click", listenerAddCard);
});
}

// @todo: Функция закрытия попапа при клике по оверлею
function closePopupOverlay(evt, pop) {
  if (evt.target === pop) {
    closePopupSlowly(pop);
  }
}

// @todo: Функция закрытия попапа при клике по Esc
function closePopupEsc(evt, pop) {
  if (evt.key === "Escape") {
    closePopupSlowly(pop);
  }
}

export {
  openPopupSlowly,
  closePopupSlowly,
  closePopupEsc,
  closePopupOverlay,
};

/////////////////////////////////////////////////CARDS.JS

// @todo: Дынные для карточки
const initialCards = [
  {
    name: "ПХПшники",
    alt: "Мем про разработчиков на языке PHP",
    link: "https://i.pinimg.com/736x/ee/37/0b/ee370bd96c70e08f6727fed673cb9587.jpg",
  },
  {
    name: "Питонисты",
    alt: "Мем про разработчиков на языке Python",
    link: "https://i.yapx.ru/X6urF.png",
  },
  {
    name: "Джависты",
    alt: "Мем про разработчиков на языке Java",
    link: "https://i.yapx.ru/X6ujY.jpg",
  },
  {
    name: "Сишники",
    alt: "Мем про разработчиков на языке C/C++",
    link: "https://i.yapx.ru/X6uoO.jpg",
  },
  {
    name: "1Сники",
    alt: "Мем про разработчиков на языке 1C",
    link: "https://cs13.pikabu.ru/post_img/big/2024/05/24/7/1716545305155733858.jpg",
  },
  {
    name: "Ассемблеристы",
    alt: "Мем про разработчиков на языке Assembler",
    link: "https://i.yapx.ru/X6uug.png",
  },
];

export { initialCards };