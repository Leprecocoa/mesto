// Показ сообщения об ошибке и подчёркивание инпута
function showErrorMessage(
  inputElement,
  errorMessage,
  errorElement,
  errorClass,
  inputErrorClass
) {
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
  inputElement.classList.add(inputErrorClass);
}

// Скрытие сообщения об ошибке и подчёркивания инпута

function hideErrorMessage(
  inputElement,
  errorElement,
  errorClass,
  inputErrorClass
) {
  errorElement.textContent = "";
  errorElement.classList.remove(errorClass);
  inputElement.classList.remove(inputErrorClass);
}

// Функция неактивной кнопки

function disableSubmitButton(buttonElement, inactiveButtonClass) {
  if (!buttonElement.classList.contains(inactiveButtonClass)) {
    buttonElement.classList.add(inactiveButtonClass);
  }
}

// Функция активной кнопки

function enableSubmitButton(buttonElement, inactiveButtonClass) {
  buttonElement.classList.remove(inactiveButtonClass);
}

// Показ ошибки и изменение состояния кнопки

function showInputError(inputElement, errorMessage, errorElement, errorClass) {
  showErrorMessage(inputElement, errorMessage, errorElement, errorClass);
}

// Скрытие сообщения об ошибки и возвращение кнопки в активное состояние

function hideInputError(inputElement, errorElement, errorClass) {
  hideErrorMessage(inputElement, errorElement, errorClass);
}

// Проверка списка инпутов на валидность

function checkInputListValidity(inputList, buttonElement, inactiveButtonClass) {
  const hasNotValidInput = inputList.some(
    (inputElement) => !inputElement.validity.valid
  );
  if (hasNotValidInput) {
    disableSubmitButton(buttonElement, inactiveButtonClass);
  } else {
    enableSubmitButton(buttonElement, inactiveButtonClass);
  }
}

// Проверка инпута на валидность

function checkValidity(formElement, inputElement, errorClass, inputErrorClass) {
  const isInputNotValid = !inputElement.validity.valid;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  if (isInputNotValid) {
    const errorMessage = inputElement.validationMessage;
    showInputError(
      inputElement,
      errorMessage,
      errorElement,
      errorClass,
      inputErrorClass
    );
  } else {
    hideInputError(inputElement, errorElement, errorClass, inputErrorClass);
  }
}

// Добавление слушателей при валидации

function addCheckValidityListeners(
  formElement,
  inputSelector,
  submitButtonSelector,
  errorClass,
  inputErrorClass,
  inactiveButtonClass
) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkValidity(formElement, inputElement, errorClass, inputErrorClass);
      checkInputListValidity(inputList, buttonElement, inactiveButtonClass);
    });
  });
}

// Ощая функция добавления слушателей

function setEventListeners(
  formElement,
  inputSelector,
  submitButtonSelector,
  errorClass,
  inputErrorClass,
  inactiveButtonClass
) {
  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });
  addCheckValidityListeners(
    formElement,
    inputSelector,
    submitButtonSelector,
    errorClass,
    inputErrorClass,
    inactiveButtonClass
  );
}

// Самая главная функция

function enableValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) =>
    setEventListeners(
      formElement,
      inputSelector,
      submitButtonSelector,
      errorClass,
      inputErrorClass,
      inactiveButtonClass
    )
  );
}

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error-span_visible",
});
