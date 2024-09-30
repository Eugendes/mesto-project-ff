// @todo: Функция плавного открытия попапа
function openPopupSlowly(pop) {
  pop.classList.add("popup_is-animated");
  setTimeout(() => {
    pop.classList.add("popup_is-opened");
  }, 0);
  document.addEventListener("keydown", closePopupEsc);
}

// @todo: Функция плавного закрытия попапа
function closePopupSlowly(pop) {
  pop.classList.remove("popup_is-opened");
  setTimeout(() => {
    pop.classList.remove("popup_is-animated");
  }, 500);
  document.removeEventListener("keydown", closePopupEsc);
}

// @todo: Функция закрытия попапа при клике по оверлею
function closePopupOverlay(evt, pop) {
  if (evt.target === pop) {
    closePopupSlowly(pop);
  }
}

// @todo: Функция закрытия попапа при клике по Esc
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    closePopupSlowly(document.querySelector(".popup_is-opened"));
  }
}

export { openPopupSlowly, closePopupSlowly, closePopupOverlay };
