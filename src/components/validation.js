// Функция валидации
export function enableValidation(
  { inputSelector, submitButtonSelector, inactiveButtonClass, errorClass },
  form
) {
  const inputs = form.querySelectorAll(inputSelector);
  const button = form.querySelector(submitButtonSelector);

  button.classList.remove(inactiveButtonClass);
  button.disabled = false;

  // Функция для проверки валидности формы
  function checkFormValidity() {
    let isValid = true;

    inputs.forEach((input) => {
      const errorElement = input.parentElement.querySelector(
        ".popup__input_type_error"
      );
      const counter = input.value.length;
      const simbol = /^[a-zA-Zа-яА-ЯёЁ\- ]+$/;
      const urlRegex = /^(https?:\/\/[^\s]+)$/;
      if (!input.value.trim()) {
        input.classList.add("popup__input-error");
        errorElement.textContent = input.validationMessage;
        errorElement.classList.add(errorClass);
        isValid = false;
      } else {
        if (counter < 2 || counter > 40) {
          input.classList.add("popup__input-error");
          errorElement.textContent = input.validationMessage;
          errorElement.classList.add(errorClass);
          isValid = false;
        } else {
          if (input.type === "url" && !urlRegex.test(input.value.trim())) {
            input.classList.add("popup__input-error");
            errorElement.textContent = input.validationMessage;
            errorElement.classList.add(errorClass);
            isValid = false;
          } else {
            if (!simbol.test(input.value.trim()) && input.type !== "url") {
              input.classList.add("popup__input-error");
              errorElement.textContent =
                "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы";
              errorElement.classList.add(errorClass);
              isValid = false;
            } else {
              input.classList.remove("popup__input-error");
              errorElement.textContent = "";
              errorElement.classList.remove(errorClass);
            }
          }
        }
      }
    });

    if (isValid) {
      button.classList.remove(inactiveButtonClass);
      button.disabled = false;
    } else {
      button.classList.add(inactiveButtonClass);
      button.disabled = true;
    }
  }

  inputs.forEach((input) => {
    input.addEventListener("input", checkFormValidity);
  });
}

// Функция очистки полей валидации
 export function clearValidation(form, { submitButtonSelector, inactiveButtonClass }) {
  const inputs = form.querySelectorAll('.popup__input');
  const button = form.querySelector(submitButtonSelector);

  inputs.forEach((input) => {
    const errorElement = input.parentElement.querySelector(".popup__input_type_error");
    if (errorElement) {
      input.classList.remove("popup__input-error");
      errorElement.textContent = "";
      errorElement.classList.remove("popup__error_visible");
    }
  });

  button.classList.add(inactiveButtonClass);
  button.disabled = false;
}
