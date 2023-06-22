let insertedValuesFiltered = [];


const sumValues = (arr) => {
  return arr.reduce((total, valueObj) => {
    
    if (insertedValuesFiltered.length === 0 || insertedValuesFiltered.includes(valueObj)) {
      return total + valueObj.value;
    }
    return total;
  }, 0);
};

const insertNewValue = (newValue, categoryID) => {
  const id = insertedValues.length;
  const valueObj = {
    id: id,
    value: newValue,
    categoryID: categoryID,
  };
  insertedValues.push(valueObj);
  renderInsertedValues();
  renderTotalSum();
};

const renderHTML = (elementId, html) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.innerHTML = html;
  }
};

const renderInsertedValues = () => {
  const list = document.querySelector(".table__container ul");
  if (list) {
    list.innerHTML = "";

    if (insertedValues.length === 0) {
      const notValueDiv = document.createElement("div");
      notValueDiv.id = "notValuer";

      const p1 = document.createElement("p");
      p1.id = "p";
      p1.textContent = "Nenhum valor cadastrado";

      const p2 = document.createElement("p");
      p2.id = "newValour";
      p2.textContent = "Registrar novo valor";

      notValueDiv.appendChild(p1);
      notValueDiv.appendChild(p2);

      list.appendChild(notValueDiv);
    } else {
      insertedValues.forEach((valueObj) => {
        const category = getCategoryName(valueObj.categoryID);

        const li = document.createElement("li");
        li.textContent = `R$ ${valueObj.value.toFixed(2).toString().replace(".", ",")}`;
        li.setAttribute("data-id", valueObj.id); 

        const span = document.createElement("span");
        span.className = "categorie";
        span.textContent = category;

        const button = document.createElement("button");
        button.className = "deleteButton";
        button.setAttribute("data-id", valueObj.id);

        const img = document.createElement("img");
        img.src = "./src/assets/trash.svg";
        img.alt = "excluir";

        button.appendChild(img);
        li.appendChild(span);
        li.appendChild(button);
        list.appendChild(li);
      });
    }
    addClickEventToDeleteButtons();
  }
};

const renderTotalSum = () => {
  const totalSum = sumValues(insertedValuesFiltered.length === 0 ? insertedValues : insertedValuesFiltered);
  const valorContainer = document.querySelector(".valor__container p");
  if (valorContainer) {
    valorContainer.textContent = `R$ ${totalSum
      .toFixed(2)
      .toString()
      .replace(".", ",")}`;
  }
};

const getCategoryName = (categoryID) => {
  if (categoryID === "open") {
    return "Entrada";
  } else if (categoryID === "close") {
    return "Saída";
  }
  return "";
};

const filterValues = (categoryID) => {
  insertedValuesFiltered = insertedValues.filter(
    (valueObj) => valueObj.categoryID === categoryID
  );
  renderFilteredValues();
};

const renderFilteredValues = () => {
  const list = document.querySelector(".table__container ul");
  if (list) {
    list.innerHTML = "";

    if (insertedValuesFiltered.length === 0) {
      const notValueDiv = document.createElement("div");
      notValueDiv.id = "notValuer";

      const p1 = document.createElement("p");
      p1.id = "p";
      p1.textContent = "Nenhum valor cadastrado";

      const p2 = document.createElement("p");
      p2.id = "newValour";
      p2.textContent = "Registrar novo valor";

      notValueDiv.appendChild(p1);
      notValueDiv.appendChild(p2);

      list.appendChild(notValueDiv);
    } else {
      insertedValuesFiltered.forEach((valueObj) => {
        const category = getCategoryName(valueObj.categoryID);

        const li = document.createElement("li");
        li.textContent = `R$ ${valueObj.value.toFixed(2).toString().replace(".", ",")}`;
        li.setAttribute("data-id", valueObj.id); 

        const span = document.createElement("span");
        span.className = "categorie";
        span.textContent = category;

        const button = document.createElement("button");
        button.className = "deleteButton";
        button.setAttribute("data-id", valueObj.id);

        const img = document.createElement("img");
        img.src = "./src/assets/trash.svg";
        img.alt = "excluir";

        button.appendChild(img);
        li.appendChild(span);
        li.appendChild(button);
        list.appendChild(li);
      });
    }
    addClickEventToDeleteButtons();
  }
};
const addFilterButtonClickEvent = () => {
  const buttonAll = document.querySelector(".button-all");
  const buttonOpen = document.querySelector(".button-open");
  const buttonEnd = document.querySelector(".button-end");

  buttonAll.addEventListener("click", () => {
    insertedValuesFiltered = [];
    renderInsertedValues();
    renderTotalSum();
  });

  buttonOpen.addEventListener("click", () => {
    filterValues("open");
    renderTotalSum();
  });

  buttonEnd.addEventListener("click", () => {
    filterValues("close");
    renderTotalSum();
  });
};


const addClickEventToDeleteButtons = () => {
  const buttons = document.querySelectorAll(".deleteButton");
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const id = event.target.getAttribute("data-id");
      const valueObj = insertedValues.find((valueObj) => valueObj.id === Number(id));
      const index = insertedValues.indexOf(valueObj);
      insertedValues.splice(index, 1);
      renderInsertedValues();
      renderTotalSum(); 
      addClickEventToDeleteButtons();
    });
  });
};




renderInsertedValues();
renderTotalSum();
addFilterButtonClickEvent();

