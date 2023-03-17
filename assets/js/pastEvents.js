import {
  printEvents,
  printCategories,
  triggerSearch,
  triggerCheckboxFilter,
  fetchData
} from "./utils.js";

const searchInput = document.getElementById("search");
const searchForm = document.getElementById("searchForm");
const filtersContainer = document.getElementById("filters");

const {currentDate, events} = await fetchData();
const pastEvents = events.filter((event) => event.date < currentDate);
let filteredEvents = [...pastEvents];

printEvents(pastEvents, "./details.html");
printCategories(pastEvents, filtersContainer);

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    triggerSearch(searchInput.value, filteredEvents);
})

filtersContainer.addEventListener("change", () => {
  filteredEvents = triggerCheckboxFilter( pastEvents, filteredEvents,"./details.html")
});
