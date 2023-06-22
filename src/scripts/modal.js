const addInsertValueButtonClickEvent = () => {
  const insertValueButton = document.querySelector(".insert-value");

  insertValueButton.addEventListener("click", () => {
    const modal = document.querySelector(".modal__controller");
    if (modal) {
      modal.showModal();
    }
  });
};


const addCancelButtonClickEvent = () => {
  const cancelButton = document.querySelector(".button-cancelar__modal");
  const modal = document.querySelector(".modal__controller");

  cancelButton.addEventListener("click", () => {
    if (modal) {
      modal.close();
    }
  });
};


const addModalCloseButtonClickEvent = () => {
  const closeButton = document.querySelector(".closeButtunModal");
  const modal = document.querySelector(".modal__controller");

  closeButton.addEventListener("click", () => {
    if (modal) {
      modal.close();
    }
  });
};


const addModalFormSubmitEvent = () => {
  const form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const valorInput = document.getElementById("input_valor");
    const tipoValorRadio = document.querySelectorAll(".input_finance");
    let categoryID;

    tipoValorRadio.forEach((radio) => {
      if (radio.checked) {
        categoryID = radio.id;
      }
    });

    const newValue = Number(valorInput.value);

    if (newValue && categoryID) {
      insertNewValue(newValue, categoryID);
      valorInput.value = "";
      const modal = document.querySelector(".modal__controller");
      if (modal) {
        modal.close();
      }
    }
  });
};

addInsertValueButtonClickEvent();
addModalCloseButtonClickEvent();
addModalFormSubmitEvent();
addCancelButtonClickEvent();
