// @todo: Темплейт карточки
const templateCard = document.querySelector("#card-template").content;
const templateList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(
  cardData,
  deleteCardCallback,
  likeCallback,
  openImageCallback
) {
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
  if (button.value.includes("is-active")) {
    button.remove("card__like-button_is-active");
  } else {
    button.add("card__like-button_is-active");
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
