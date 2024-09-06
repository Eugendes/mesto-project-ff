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

/*Почему в тексте ревью "результат ее выполнения уже в разметку добавляет используя PREPEND" ???*/

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
