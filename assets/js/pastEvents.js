import { data } from "./data.js";
import {
  printEvents,
  printCategories,
  checkboxFilter,
  triggerSearch,
} from "./utils.js";

const searchInput = document.getElementById("search");
const searchForm = document.getElementById("searchForm");
const filtersContainer = document.getElementById("filters");

let currentDate = data.currentDate;
const events = data.events.filter((event) => event.date < currentDate);
let filteredEvents = [...events];

printEvents(events, "./details.html");
printCategories(events, filtersContainer);

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    triggerSearch(searchInput.value, filteredEvents);
})

filtersContainer.addEventListener("change", () => {
  // redefino filtered events a su valor original para que siempre busque entre todos los eventos originales
  filteredEvents = [...events];
  filteredEvents = checkboxFilter(filteredEvents);
  //esto funciona como seguro para que cuando ningun checkbox este activo te muestre todos los eventos de vuelta
  if (filteredEvents.length > 0) {
    printEvents(filteredEvents, "./details.html");
  } else {
    filteredEvents = [...events];
    printEvents(filteredEvents, "./details.html");
  }
});
