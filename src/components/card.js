import { likeCards, dislikeCards, deleteCards } from "../components/api.js";

// @todo: Темплейт карточки
const templateCard = document.querySelector("#card-template").content;
const templateList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(
  cardData,
  deleteCardCallback,
  likeCallback,
  openImageCallback,
  userId
) {
  const {
    cardTitle,
    cardAlt,
    cardLink,
    cardLikeCounter = [],
    cardId,
    ownerId,
  } = cardData;
  const templateElement = templateCard.querySelector(".card").cloneNode(true);
  const likeButton = templateElement.querySelector(".card__like-button");
  const isLikedByUser = cardLikeCounter.some((like) => like._id === userId);
  templateElement.querySelector(".card__title").textContent = cardTitle;
  templateElement.querySelector(".card__image").alt = cardAlt;
  templateElement.querySelector(".card__image").src = cardLink;
  templateElement.querySelector(".card__like__counter").textContent =
    cardLikeCounter.length;
  templateElement.dataset.id = cardId;

  if (isLikedByUser) {
    likeButton.classList.add("card__like-button_is-active");
  }

  const deleteButton = templateElement.querySelector(".card__delete-button");
  if (ownerId !== userId) {
    deleteButton.style.display = "none";
  } else {
    deleteButton.style.display = "block";
    deleteButton.addEventListener("click", deleteCardCallback);
  }

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
function likeActive(evt, cardId) {
  const button = evt.target.classList;
  const card = evt.target.closest(".card");
  const countElement = card.querySelector(".card__like__counter");
  let count = parseInt(countElement.textContent, 10);

  if (button.contains("card__like-button_is-active")) {
    button.remove("card__like-button_is-active");
    dislikeCards(cardId).then(() => {
      count -= 1;
      countElement.textContent = count;
    });
  } else {
    button.add("card__like-button_is-active");
    likeCards(cardId).then(() => {
      count += 1;
      countElement.textContent = count;
    });
  }
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
  const card = evt.target.closest(".card");
  const cardId = card.dataset.id;
  if (card) {
    deleteCards(cardId);
    card.remove();
  }
}

export { likeActive, deleteCard, createCard, renderCard };
