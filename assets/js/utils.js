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
export const printCheckboxes = (eventsArray, checkboxesContainer) => {
  // este array vacio sirve para tener control de que categorías ya fueron usadas
  let categories = [];
  eventsArray.forEach((event) => {
    // el if verifica que la categoria del evento no esté en el array
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
const checkboxFilter = (eventArray) => {
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

export const triggerCheckboxFilter = (
  eventArray,
  filteredEvents,
  detailsPath
) => {
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
};

export const fetchData = async () => {
  try {
    let eventData;
    await fetch("/assets/data/amazing.json")
      .then((response) => response.json())
      .then((events) => {
        eventData = events;
      });
    return eventData;
  } catch (error) {
    console.log(error);
  }
};

export const addAttendancePercentage = (eventArray) => {
  // calcula el attendance pecentage y lo añade como atributo para usarlo posteriormente
  eventArray.forEach((event) => {
    event.attendancePercentage = Math.floor((((event.assistance) ? event.assistance : event.estimate) / event.capacity ) * 100);
  });
};
export const addRevenues = (eventArray) => {
  //calcula las ganancias y las añade como atributo para usarlo posteriormente
  eventArray.forEach((event) => {
    event.revenues = (event.assistance
      ? event.assistance
      : event.estimate )* event.price;
  });
};
const getHighestCapacity = (eventArray) => {
  // devuelve el evento con mayor capacidad
  return eventArray.reduce((prevEvent, currentEvent) =>
    (prevEvent.capacity > currentEvent.capacity) ? prevEvent : currentEvent
  ).name;
};
const getAttendance = (eventArray, condition) => {
  // devuelve el evento con mayor o menor asistencia
  if (condition === "highest") {
    return eventArray.find(
      (event) =>
        event.attendancePercentage ===
       Math.max(...eventArray.map((event) => event.attendancePercentage))
    ).name;
  } else {
    return eventArray.find(
      (event) =>
        event.attendancePercentage ===
        Math.min(...eventArray.map((event) => event.attendancePercentage))
    ).name;
  }
};

export const getEventsByCategory = (eventArray) => {
  let categories = [];
  let eventsByCategory = [];
  eventArray.forEach((event) => {
    // al igual que en 'printCheckboxes' uso el array categories para ir verificando que no se repitan las categorias
    if (!categories.includes(event.category)) {
      categories.push(event.category);
      //una vez asegurado que no es una categoria repetida empujo todos los eventos de esa categoría a eventsByCategory guardados cada coleccion de eventos en un array
      eventsByCategory.push(
        eventArray.filter(
          (filteredEvents) => filteredEvents.category === event.category
        )
      );
    }
  });
  // el output se debería ver algo asi: [ [eventos por categoria 1], [eventos por categoria 2], [eventos por categoria n] ]
  return eventsByCategory;
};
export const calculateStatistics = (eventsByCategoryArray) => {
  //acá basicamente se calcula todas las estadísticas y las devuelvo en un array de objetos
  let statistics = [];
  eventsByCategoryArray.forEach((eventArray) => {
    let totalRevenues = 0;
    let totalCapacity = 0;
    let totalPeople = 0;
    let categoryName = eventArray[0].category;
    eventArray.forEach((event) => {
      totalRevenues += event.revenues;
      totalPeople += event.assistance ? event.assistance : event.estimate;
      totalCapacity += event.capacity;
    });
    let result = {
      categoryName,
      totalRevenues: `${totalRevenues}$`,
      attendancePercentage: `${Math.floor(
        (totalPeople / totalCapacity) * 100
      )}%`,
    };
    statistics.push(result);
  });
  return statistics;
};
export const printAllEventsStatistics = (eventArray, container) => {
  // imprime los datos del primer tbody
  const data = {
    highestAttendance: getAttendance(eventArray, "highest"),
    lowestAttendance: getAttendance(eventArray, ""),
    highestCapacity: getHighestCapacity(eventArray),
  };
  const tr = document.createElement("tr");
  for (const key in data) {
    let td = document.createElement("td");
    td.innerText = data[key];
    tr.appendChild(td);
  }
  container.appendChild(tr);
};
export const printStatistics = (container, data) => {
  // imprime los datos del segundo o tercer tbody
  data.forEach((statistics) => {
    const tr = document.createElement("tr");
    for (const key in statistics) {
      let td = document.createElement("td");
      td.innerText = statistics[key];
      tr.appendChild(td);
    }
    container.appendChild(tr);
  });
};
