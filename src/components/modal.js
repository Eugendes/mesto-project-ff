// @todo: Импортируем файлы .js
import { popups } from "../components/index.js";
import { createCard, renderCard } from "../components/cards.js";

// @todo: Функция редактирования попапа
function editPopup(pop) {
  pop.style.display = "flex";

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
      closePopupButton(pop);
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
        renderCard(createCard(cardElement));
        closePopupButton(pop);
      }
    });
  }
}

// @todo: Функция для открытия большого изображения
function popupImage(evt) {
  const { src, alt } = evt.target;
  popups.bigCard.querySelector(".popup__image").src = src;
  popups.bigCard.querySelector(".popup__image").alt = alt;
  popups.bigCard.querySelector(".popup__caption").textContent = alt;
  openPopupSlowly(popups.bigCard);
  popups.bigCard.style.display = "flex";
}

// @todo: Функция плавного открытия попапа
function openPopupSlowly(pop) {
  pop.classList.add("popup_is-animated");
  setTimeout(() => {
    pop.classList.add("popup_is-opened");
  }, 0);
}

// @todo: Функция плавного закрытия попапа
function closePopupSlowly(pop) {
  pop.classList.remove("popup_is-opened");
  setTimeout(() => {
    pop.classList.remove("popup_is-animated");
    pop.style.display = "none";
  }, 500);
}

/*
                Закрытие по крестику и оверлею/Esc
                сделано отдельно, для использования 
                в различных ситуациях
*/

// @todo: Функция закрытия попапа на крестик
function closePopupButton(pop) {
  closePopupSlowly(pop);
  if (pop === popups.newCard) {
    pop.querySelectorAll("input").forEach((input) => (input.value = ""));
  }
}

// @todo: Функция закрытия попапа при клике по оверлею или по Esc
function closePopupElse(evt, pop) {
  if (evt.target === pop || evt.key === "Escape") {
    closePopupButton(pop);
  }
}

export {
  editPopup,
  popupImage,
  openPopupSlowly,
  closePopupButton,
  closePopupElse,
};
