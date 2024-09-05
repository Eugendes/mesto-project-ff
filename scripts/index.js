// @todo: Темплейт карточки.........................................

const templateCard = document.querySelector("#card-template").content;
const templateList = document.querySelector(".places__list");

// @todo: DOM узлы

// @todo: Функция создания карточки..................................

function addCard(initialCards) {
  const { cardTitle, cardAlt, cardLink } = initialCards;
  const templateElement = templateCard.querySelector(".card").cloneNode(true);
  templateElement.querySelector(".card__title").textContent = cardTitle;
  templateElement.querySelector(".card__image").alt = cardAlt;
  templateElement.querySelector(".card__image").src = cardLink;
  templateList.append(templateElement);

  templateElement.querySelector(".card__delete-button").addEventListener("click", deleteCard);
}

// @todo: Функция удаления карточки..................................

function deleteCard(event) {
  const card = event.target.closest('.card');
  if (card) {
    card.remove();
  }
}

// @todo: Вывести карточки на страницу...............................

initialCards.forEach((item) => {
  addCard({
    cardTitle: item.name,
    cardAlt: item.alt,
    cardLink: item.link
  });
});
