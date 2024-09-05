import { cardsData } from "./cards.js";




// @todo: Темплейт карточки.........................................

const templateCard = document.querySelector("#card-template").content;
const templateList = document.querySelector(".places__list");

// @todo: DOM узлы

// @todo: Функция создания карточки..................................

function addCard(cardTitle, cardLink) {
  const templateElement = templateCard.querySelector(".card").cloneNode(true);
  templateElement.querySelector(".card__image").src = cardLink;
  templateElement.querySelector(".card__title").textContent = cardTitle;
  templateList.append(templateElement);

  const deleteButtons = document.querySelectorAll(".card__delete-button").forEach((Button) => 
    Button.addEventListener("click", deleteCard));
}

// @todo: Функция удаления карточки..................................

function deleteCard() {
  const button = event.target.parentElement.remove();
}

// @todo: Вывести карточки на страницу...............................

cardsData.forEach((item) => {
  const names = item.name;
  const links = item.link;
  addCard(names, links);
});
/*
for (let i = 0; i < cardsData.length; i++) {
  const names = cardsData.map((card) => card.name);
  const links = cardsData.map((card) => card.link);
  addCard(names[i], links[i]);
}*/
