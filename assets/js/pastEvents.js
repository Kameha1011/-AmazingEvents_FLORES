import {data} from "./data.js";
import { printEvents, printCategories, search, checkboxFilter } from "./utils.js";

const searchInput = document.getElementById("search");
const filtersContainer = document.getElementById("filters");

let currentDate = data.currentDate;
const events = data.events.filter( (event) => event.date < currentDate );
let filteredEvents = [...events];

printEvents(events);
printCategories(events, filtersContainer);

searchInput.addEventListener("input", () => {
    //si el input está vacio muestra todos los eventos de vuelta.
    if(searchInput.value !== ''){
        printEvents(search(filteredEvents, searchInput.value));
    }else{
        printEvents(filteredEvents);
    }
});

filtersContainer.addEventListener('change', () => {
    // redefino filtered events a su valor original para que siempre busque entre todos los eventos originales
    filteredEvents = [...events];
    filteredEvents = checkboxFilter(filteredEvents);
    //esto funciona como seguro para que cuando ningun checkbox este activo te muestre todos los eventos de vuelta
    if( filteredEvents.length > 0 ){
        printEvents( filteredEvents );
    }else{
        printEvents(events)
    }
} )