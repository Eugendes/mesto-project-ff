import { initialCards } from "./cards.js"; 
import './styles/index.css';

// images.js
import logo from './images/logo.svg';
import avatar from './images/avatar.jpg';

// затем использовать эти переменные в вашем HTML
document.querySelector('.logo').src = logo;
document.querySelector('.profile__image').style.backgroundImage = `url(${avatar})`;

// @todo: Темплейт карточки.........................................

const templateCard = document.querySelector("#card-template").content;
const templateList = document.querySelector(".places__list");

// @todo: DOM узлы

// @todo: Функция создания карточки..................................

function createCard(cardData) {
  const { cardTitle, cardAlt, cardLink } = cardData;
  const templateElement = templateCard.querySelector(".card").cloneNode(true);
  templateElement.querySelector(".card__title").textContent = cardTitle;
  templateElement.querySelector(".card__image").alt = cardAlt;
  templateElement.querySelector(".card__image").src = cardLink;

  templateElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);

  return templateElement;
}

// @todo: Функция рендеринга карточки

function renderCard(cardElement) {
  templateList.append(cardElement);
}

// @todo: Функция удаления карточки..................................

function deleteCard(event) {
  const card = event.target.closest(".card");
  if (card) {
    card.remove();
  }
}

// @todo: Вывести карточки на страницу...............................

initialCards.forEach((item) => {
  const cardElement = createCard({
    cardTitle: item.name,
    cardAlt: item.alt,
    cardLink: item.link,
  });
  renderCard(cardElement);
});

///////////////////////////////////////////////////////////////////////////////////////
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");

popupEdit.querySelector(".popup__close").addEventListener("click", () => closePop(popupEdit));
popupNewCard.querySelector(".popup__close").addEventListener("click", () => closePop(popupNewCard));


document.querySelector(".profile__edit-button").addEventListener("click", () => editPop(popupEdit));
popupEdit.addEventListener("click", (evt) => closePopOverlay(evt, popupEdit));

document.querySelector(".profile__add-button").addEventListener("click", () => editPop(popupNewCard));
popupNewCard.addEventListener("click", (evt) => closePopOverlay(evt, popupNewCard));

function editPop(pop) {
  if (pop.style.display === 'none' || pop.style.display === '') {
    pop.style.display = "flex";
  }
  document.addEventListener("keydown", (evt) => closePopEsc(evt, popupNewCard));
  document.addEventListener("keydown", (evt) => closePopEsc(evt, popupEdit));
}

function closePop(pop) {
  pop.style.display = "none";
}

function closePopOverlay(evt, pop) {
  if (evt.target === pop) {
    closePop(pop)
  }
}

function closePopEsc(evt, pop) {
  if (evt.key === 'Escape') {
    closePop(pop);
  }
}

const cardList = document.querySelector(".places__list");
const bigCard = document.querySelector(".popup_type_image");
bigCard.querySelector(".popup__close").addEventListener("click", () => closePop(bigCard));
bigCard.addEventListener("click", (evt) => closePopOverlay(evt, bigCard));
document.addEventListener("keydown", (evt) => closePopEsc(evt, bigCard));

cardList.addEventListener("click", (evt) => popupImage(evt));


function popupImage(evt) {
  if (bigCard.style.display === 'none' || bigCard.style.display === '') {
    bigCard.style.display = "flex";
    bigCard.querySelector(".popup__image").src = evt.target.src;
    bigCard.querySelector(".popup__image").alt = evt.target.alt;
    bigCard.querySelector(".popup__caption").textContent = evt.target.alt;
  }
}





