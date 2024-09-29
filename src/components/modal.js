import {
  popups,
  removePopupCloseHandlers,
  createCardListener,
  editCardListener,
} from "../components/index.js";

// @todo: Функция плавного открытия попапа
function openPopupSlowly(pop) {
  pop.classList.add("popup_is-animated");
  setTimeout(() => {
    pop.classList.add("popup_is-opened");
  }, 0);
  pop.querySelectorAll("input").forEach((input) => (input.value = ""));

  // @todo: Обработчик для закрытия попапов с клавиатуры
  document.addEventListener("keydown", (evt) => {
    Object.values(popups).forEach((popup) => closePopupEsc(evt, popup));
  });
}

// @todo: Функция плавного закрытия попапа
function closePopupSlowly(pop) {
  pop.classList.remove("popup_is-opened");
  setTimeout(() => {
    pop.classList.remove("popup_is-animated");
  }, 500);

  removePopupCloseHandlers(pop);
  const form = pop.querySelector(".popup__form");
  if (pop === popups.edit) {
    form.removeEventListener("submit", editCardListener);
  }
  if (pop === popups.newCard) {
    form.removeEventListener("submit", createCardListener);
  }
}

// @todo: Функция закрытия попапа при клике по оверлею
function closePopupOverlay(evt, pop) {
  if (evt.target === pop) {
    closePopupSlowly(pop);
  }
}

// @todo: Функция закрытия попапа при клике по Esc
function closePopupEsc(evt, pop) {
  if (evt.key === "Escape") {
    closePopupSlowly(pop);
  }
}

export { openPopupSlowly, closePopupSlowly, closePopupOverlay };
