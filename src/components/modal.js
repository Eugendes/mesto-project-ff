import { popups } from "../components/index.js";

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

export { popupImage, openPopupSlowly, closePopupButton, closePopupElse };
