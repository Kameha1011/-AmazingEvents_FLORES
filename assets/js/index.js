import {data} from "./data.js";
import { printEvents, printCategories, search, checkboxFilter } from "./utils.js";
const searchInput = document.getElementById("search");
const filtersContainer = document.getElementById("filters");

// guardo data.events en una constante para poder volver a su valor cuando no hay nada en las checkboxes o en el input
const events = data.events;

let filteredEvents = [...events];
printCategories(events, filtersContainer);
printEvents(events, './pages/details.html');

searchInput.addEventListener("input", () => {
    //si el input está vacio muestra todos los eventos de vuelta.
    if(searchInput.value !== ''){
        printEvents(search(filteredEvents, searchInput.value), './pages/details.html');
    }else{
        printEvents(filteredEvents, './pages/details.html');
    }
});
filtersContainer.addEventListener('change', () => {
    // redefino filtered events a su valor original para que siempre busque entre todos los eventos originales
    filteredEvents = [...events];
    filteredEvents = checkboxFilter(filteredEvents);
    //esto funciona como seguro para que cuando ningun checkbox este activo te muestre todos los eventos de vuelta
    if( filteredEvents.length > 0 ){
        printEvents( filteredEvents, './pages/details.html' );
    }else{
        filteredEvents = [...events];
        printEvents(filteredEvents, './pages/details.html');
    }
} )
