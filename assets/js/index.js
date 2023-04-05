import {
  printEvents,
  printCheckboxes,
  triggerSearch,
  triggerCheckboxFilter,
  fetchData
} from "./utils.js";


const searchInput = document.getElementById("search");
const filtersContainer = document.getElementById("filters");
const searchForm = document.getElementById("searchForm");

// guardo data.events en una constante para poder volver a su valor cuando no hay nada en las checkboxes o en el input
const { events } = await fetchData();
let filteredEvents = [...events];
printCheckboxes(events, filtersContainer);
printEvents(events, "./pages/details.html");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  triggerSearch(searchInput.value, filteredEvents);
});

filtersContainer.addEventListener("change", () => {
  filteredEvents = triggerCheckboxFilter(events, filteredEvents, './pages/details.html');
});
