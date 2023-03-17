export const printEvents = (eventArray, detailsRoute) => {
  let eventSkeleton = "";
  const eventSection = document.getElementById("events");
  const eventFragment = document.createDocumentFragment();
  const eventContainer = document.createElement("div");
  eventSection.innerHTML = "";
  eventContainer.classList.add(
    "container",
    "d-flex",
    "flex-wrap",
    "gap-3",
    "justify-content-md-center",
    "justify-content-center"
  );
  if (eventArray.length > 0) {
    eventArray.forEach((event) => {
      eventSkeleton += `
          <div class="card">
              <img
                src="${event.image}"
                class="card-img-top"
                alt="${event.name}"
              />
              <div class="card-body">
                <h5 class="card-title">
                  ${event.name} <span class="badge">${event.category}</span>
                </h5>
                <h5>Date: ${event.date}</h5>
                <p class="card-text">
                  ${event.description}
                </p>
                <a href="${detailsRoute}?id=${event._id}" class="btn">See Details</a>
              </div>
          </div> `;
    });
  } else {
    eventSkeleton =
      "<h2 class='display-4 text-center fw-bold'>No matches found</h2>";
  }
  eventContainer.innerHTML = eventSkeleton;
  eventFragment.appendChild(eventContainer);
  eventSection.appendChild(eventFragment);
};
export const printCategories = (eventsArray, checkboxesContainer) => {
  let categories = [];
  eventsArray.forEach((event) => {
    if (!categories.includes(event.category)) {
      categories.push(event.category);
      checkboxesContainer.innerHTML += `
        <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          value="${event.category}"
          id="${event.category}"
        />
        <label class="form-check-label" for="${event.category}">
          ${event.category}
        </label>
        </div>`;
    }
  });
};
const search = (eventArray, searchText) => {
  // filtra eventos por el nombre
  const filteredEvents = eventArray.filter((event) => {
    return event.name.toLowerCase().includes(searchText.toLowerCase());
  });
  return filteredEvents;
};
export const checkboxFilter = (eventArray) => {
  //recolecto todos los checkboxes y de una vez saco su value con .map
  const checkedValues = Array.from(
    document.querySelectorAll("input[type=checkbox]")
  ).map((checkbox) => {
    if (checkbox.checked) {
      return checkbox.value;
    }
  });
  //retorno los eventos que coincidan con las categorias de checkedValues
  return eventArray.filter((event) => checkedValues.includes(event.category));
};

export const triggerSearch = (inputValue, eventArray) => {
  //si el input está vacio muestra todos los eventos de vuelta.
  inputValue !== ""
    ? printEvents(search(eventArray, inputValue), "./pages/details.html")
    : printEvents(eventArray, "./pages/details.html");
};

export const triggerCheckboxFilter =  (eventArray,filteredEvents, detailsPath) => {
   // redefino filtered events a su valor original para que siempre busque entre todos los eventos originales
   filteredEvents = [...eventArray];
   filteredEvents = checkboxFilter(filteredEvents);
   //esto funciona como seguro para que cuando ningun checkbox este activo te muestre todos los eventos de vuelta
   if (filteredEvents.length > 0) {
     printEvents(filteredEvents, detailsPath);
   } else {
     filteredEvents = [...eventArray];
     printEvents(filteredEvents, detailsPath);
   }
   return filteredEvents;
}