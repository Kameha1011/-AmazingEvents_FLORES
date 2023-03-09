import {data} from './data.js'
import { printEvents } from './utils.js';
const searchInput = document.getElementById("search");
const searchForm = document.getElementById("searchForm");
searchInput.addEventListener("keyup", (e) => {
  console.log(e.target.value);
  const filteredEvents = data.events.filter( event => {
    return event.name.toLowerCase().includes(e.target.value.toLowerCase()) || event.description.toLowerCase().includes(e.target.value.toLowerCase())
  } )
  printEvents(filteredEvents);
});

