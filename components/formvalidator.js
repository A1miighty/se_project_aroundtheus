class FormValidator {
  constructor(validationSetting, formEl) {
    this._inputSelector = validationSetting.inputSelector;
    this._submitButtonSelector = validationSetting.submitButtonSelector;
    this._inactiveButtonClass = validationSetting.inactiveButtonClass;
    this._inputErrorClass = validationSetting.inputErrorClass;
    this._errorClass = validationSetting.errorClass;

    this._formEl = formEl;
  }

  _showInputError(inputEl) {
    this._errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    this._errorMessageEl.textContent = inputEl.validationMessage;
    this._errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    this._errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    this._errorMessageEl.textContent = "";
    this._errorMessageEl.classList.remove(this._errorClass);
  }

  _enableButton(submitButton) {
    submitButton.classList.add(this._inactiveButtonClass);
    submitButton.disabled = true;
  }

  _disableButton(submitButton) {
    submitButton.classList.remove(this._inactiveButtonClass);
    submitButton.disabled = false;
  }

  _toggleButtonState(inputEls, validationSetting, submitButton) {
    if (this._hasInvalidInput(inputEls)) {
      this._enableButton(submitButton, validationSetting);
      return;
    }
    this._disableButton(submitButton, validationSetting);
  }

  _hasInvalidInput(inputList) {
    return !inputList.every((inputEl) => inputEl.validity.valid);
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      return this._showInputError(inputEl);
    }
    this._hideInputError(inputEl);
  }

  _setEventListeners(validationSetting) {
    this._inputEls = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );
    this._submitButton = this._formEl.querySelector(this._submitButtonSelector);
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState(
          this._inputEls,
          validationSetting,
          this._submitButton
        );
      });
    });
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
  }

  // New resetValidation method
  resetValidation() {
    // Disable the submit button initially
    this._enableButton(this._submitButton);

    // Loop over all input elements and hide any visible errors
    this._inputEls.forEach((inputEl) => {
      this._hideInputError(inputEl);
    });
  }
}

export default FormValidator;
