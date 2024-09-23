// @todo: Импортируем изображения для css
import like from "../images/like-active.svg";

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

// @todo: Темплейт карточки
const templateCard = document.querySelector("#card-template").content;
const templateList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(cardData) {
  const { cardTitle, cardAlt, cardLink } = cardData;
  const templateElement = templateCard.querySelector(".card").cloneNode(true);
  templateElement.querySelector(".card__title").textContent = cardTitle;
  templateElement.querySelector(".card__image").alt = cardAlt;
  templateElement.querySelector(".card__image").src = cardLink;

  templateElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);

  templateElement
    .querySelector(".card__like-button")
    .addEventListener("click", likeActive);

  return templateElement;
}

// @todo: Функция рендеринга карточки
function renderCard(cardElement) {
  templateList.prepend(cardElement);
}

// @todo: Установка обработчика для кнопок лайков
function likeActive(evt) {
  const button = evt.currentTarget;
  button.style.backgroundImage = button.style.backgroundImage
    ? ""
    : `url(${like})`;
}

// @todo: Функция удаления карточки
function deleteCard(event) {
  const card = event.target.closest(".card");
  if (card) {
    card.remove();
  }
}

export { initialCards, createCard, renderCard };
