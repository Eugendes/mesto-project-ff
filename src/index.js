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
  
    templateElement.querySelector(".card__like-button").addEventListener('click', likeActive)

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
popupEdit.querySelector(".popup__close").addEventListener("click", () => closePopup(popupEdit));
document.querySelector(".profile__edit-button").addEventListener("click", () => editPopup(popupEdit));
popupEdit.addEventListener("mousedown", (evt) => closePopupOverlay(evt, popupEdit));

const popupNewCard = document.querySelector(".popup_type_new-card");
popupNewCard.querySelector(".popup__close").addEventListener("click", () => closePopup(popupNewCard));
document.querySelector(".profile__add-button").addEventListener("click", () => editPopup(popupNewCard));
popupNewCard.addEventListener("mousedown", (evt) => closePopupOverlay(evt, popupNewCard));

function editPopup(pop) {
  if (pop.style.display === 'none' || pop.style.display === '') {
    pop.style.display = "flex";
  }
  if (pop === popupEdit) {
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
      closePopup(pop);
    });
  }
  if (pop === popupNewCard) {
    const cardName = pop.querySelector(".popup__input_type_card-name");
    const cardUrl = pop.querySelector(".popup__input_type_url");
    pop.querySelector(".popup__button").addEventListener("click", (event) => {
      event.preventDefault();
      if (cardName.value.length > 0 && cardUrl.value.length > 0) {
        const cardElement = {
          cardTitle: cardName.value,
          cardAlt: cardName.value,
          cardLink: cardUrl.value,
        };
        const newCardElement = createCard(cardElement);
        renderCard(newCardElement);
        closePopup(pop);
      }
    });
  }
  document.addEventListener("keydown", (evt) => closePopupEsc(evt, popupNewCard));
  document.addEventListener("keydown", (evt) => closePopupEsc(evt, popupEdit));
  document.addEventListener("keydown", (evt) => closePopupEsc(evt, bigCard));
}


function closePopup(pop) {
  pop.style.display = "none";
  const inputs = document.querySelectorAll('input');
  if (pop === popupNewCard) {
    inputs.forEach(input => {
      input.value = '';  
    });
  }
}

function closePopupOverlay(evt, pop) {
  if (evt.target === pop) {
    closePopup(pop)
  }
}

function closePopupEsc(evt, pop) {
  if (evt.key === 'Escape') {
    closePopup(pop);
  }
}

const cardList = document.querySelector(".places__list");
const bigCard = document.querySelector(".popup_type_image");
bigCard.querySelector(".popup__close").addEventListener("click", () => closePopup(bigCard));
bigCard.addEventListener("mousedown", (evt) => closePopupOverlay(evt, bigCard));

cardList.addEventListener("click", (evt) => popupImage(evt));

function popupImage(evt) {
  if (evt.target.classList.value !== "card__image") {
    return 0;
  }
  if (bigCard.style.display === 'none' || bigCard.style.display === '') {
    bigCard.style.display = "flex";
    bigCard.querySelector(".popup__image").src = evt.target.src;
    bigCard.querySelector(".popup__image").alt = evt.target.alt;
    bigCard.querySelector(".popup__caption").textContent = evt.target.alt;
  }
}


import like from './images/like-active.svg';
function likeActive (evt) {
  const button = evt.currentTarget; 
  if (button.style.backgroundImage === '') {
    button.style.backgroundImage = `url(${like})`;
  } else {
    button.style.backgroundImage = '';
  }
}



