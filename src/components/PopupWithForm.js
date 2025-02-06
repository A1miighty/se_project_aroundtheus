import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    console.log("Popup element found:", this._popup);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".modal__form");
    this._inputList = this._form.querySelectorAll(".modal__input");
    this._submitButton = this._form.querySelector(".modal__button");
  }
  // Private method to collect form data
  _getInputValues() {
    const values = {};
    this._inputList.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  getForm() {
    return this._form;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      // Here you insert the `value` by the `name` of the input
      input.value = data[input.name];
    });
  }

  // Override the setEventListeners method to include form submission
  setEventListeners() {
    super.setEventListeners(); // Call parent method to set up close listeners

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const formData = this._getInputValues();

      // Ensure _handleFormSubmit always returns a Promise
      Promise.resolve(this._handleFormSubmit(formData))
        .then(() => {
          this._form.reset();
          this.close(); // Close only after promise resolves
        })
        .catch((error) => {
          console.error("Error in form submission:", error);
        });
    });
  }
}
