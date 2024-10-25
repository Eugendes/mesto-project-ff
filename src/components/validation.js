const disableSubmitButton = (button, { inactiveButtonClass }) => {
  button.classList.add(inactiveButtonClass);
  button.disabled = true;
};

const addSubmitButton = (button, { inactiveButtonClass }) => {
  button.classList.remove(inactiveButtonClass);
  button.disabled = false;
};

const hideInputError = (input, errorClass, inputErrorClass, spanErrorClass) => {
  const errorElement = input.parentElement.querySelector(spanErrorClass);
  if (errorElement) {
    input.classList.remove(inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(errorClass);
  }
};

// Функция валидации
export function enableValidation(
  { 
    inputSelector, 
    submitButtonSelector, 
    inactiveButtonClass, 
    inputErrorClass,
    spanErrorClass,
    errorClass },
  form
) {
  const inputs = form.querySelectorAll(inputSelector);
  const button = form.querySelector(submitButtonSelector);

  button.classList.add(inactiveButtonClass);
  button.disabled = true;

  // Функция для проверки валидности формы
  function checkFormValidity() {
    let isValid = true;

    inputs.forEach((input) => {
      const customErrorMessage = input.dataset.errorMessage;
      const errorElement = input.parentElement.querySelector(spanErrorClass);
      if (!input.checkValidity()) {
        input.classList.add(inputErrorClass);
        errorElement.textContent = input.validity.patternMismatch ? customErrorMessage : input.validationMessage;
        errorElement.classList.add(errorClass);
        isValid = false;
      } else {
        hideInputError(input, errorClass, inputErrorClass, spanErrorClass);
      }
    });

    if (isValid) {
      addSubmitButton(button, { inactiveButtonClass });
    } else {
      disableSubmitButton(button, { inactiveButtonClass });
    }
  }

  inputs.forEach((input) => {
    input.addEventListener("input", checkFormValidity);
  });
}

// Функция очистки полей валидации
 export function clearValidation(
  { 
  inputSelector,
  submitButtonSelector, 
  inactiveButtonClass,
  inputErrorClass,
  spanErrorClass,
  errorClass,
  },
  form
) {
  const inputs = form.querySelectorAll(inputSelector);
  const button = form.querySelector(submitButtonSelector);

  inputs.forEach((input) => {
    hideInputError(input, errorClass, inputErrorClass, spanErrorClass);
  });

  disableSubmitButton(button, { inactiveButtonClass });
}
