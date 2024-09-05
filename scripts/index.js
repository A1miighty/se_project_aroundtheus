const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

//wrappers
const cardListEl = document.querySelector(".cards__list");
const editModal = document.querySelector("#edit-modal");
const addCardModal = document.querySelector("#add-modal");
const profileEditForm = editModal.querySelector(".modal__form");
const addCardForm = addCardModal.querySelector(".modal__form");
const previewModal = document.querySelector("#preview-modal");
const previewModalImage = document.getElementById(".modal__image");

//buttons and Dom nodes
const profileAddbtn = document.querySelector(".profile__add-button");
const profileEditBtn = document.querySelector("#profile-edit-button");
const profileModalCloseBtn = editModal.querySelector(".modal__close");
const addCardModalCloseBtn = addCardModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const previewModalCloseBtn = previewModal.querySelector(".modal__close");

//form data
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardImageEl = document.querySelectorAll(".card__image");

const previewCardImage = document.querySelector(".modal__image");
const previewDescription = document.querySelector(".modal__description");

/*---------------------------------------------------------------------- 
                                "Functions"
---------------------------------------------------------------------- */

function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");

  //add evt listener to the dlt button
  //cardELement.remove()
  // add click listener to the cardImage element
  //open modal with previewModal

  cardImageEl.addEventListener("click", () => {
    previewModal.classList.add("modal_opened");
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardDeleteBtn.addEventListener("click", () => {
    cardElement.remove(".card");
  });

  cardImageEl.addEventListener("click", () => {
    previewModal.classList.add("modal_opened");
    previewCardImage.src = cardImageEl.src;
    previewDescription.textContent = cardTitleEl.textContent;
  });

  cardImageEl.src = cardData.link;
  cardTitleEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  return cardElement;
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}
/*---------------------------------------------------------------------- 
                              "Event Handlers" 
---------------------------------------------------------------------- */
const cardTitleInput = addCardForm.querySelector(".modal__input_type_title");
const cardUrlInput = addCardForm.querySelector(".modal__input_type_url");

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(editModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardsWrap);
  closePopup(addCardModal);
}

function handlePreviewImage(cardData) {
  previewCardImage.src = cardData.link;
  previewCardImage.alt = cardData.name;
  previewDescription.textContent = cardData.name;
  previewModal.classList.add("modal_opened");
}

/*----------------------------------------------------------------------
                                "Wrappers" 
---------------------------------------------------------------------- */
const cardsWrap = document.querySelector(".cards__list");

/*---------------------------------------------------------------------- 
                                "Event Listeners" 
---------------------------------------------------------------------- */

profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  editModal.classList.add("modal_opened");
});

profileAddbtn.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  addCardModal.classList.add("modal_opened");
});

profileModalCloseBtn.addEventListener("click", () => closePopup(editModal));

addCardModalCloseBtn.addEventListener("click", () => closePopup(addCardModal));

previewModalCloseBtn.addEventListener("click", () => closePopup(previewModal));

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addCardForm.addEventListener("submit", handleAddCardSubmit);

//Bot suggestion
cardImageEl.forEach((img) => {
  img.addEventListener("click", function () {
    previewModal.computedStyleMap.display = "block";
    previewCardImage.src = cardImageEl.src;
  });
});

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
