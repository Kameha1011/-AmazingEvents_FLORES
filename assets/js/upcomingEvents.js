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
const upcomingEvents = events.filter((event) => event.date > currentDate);
let filteredEvents = [...upcomingEvents];

printEvents(upcomingEvents, "./details.html");
printCategories(upcomingEvents, filtersContainer);

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    triggerSearch(searchInput.value, filteredEvents);
})

filtersContainer.addEventListener("change", () => {
  filteredEvents = triggerCheckboxFilter(upcomingEvents, filteredEvents, "./details.html");
});
