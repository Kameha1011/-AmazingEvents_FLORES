import {fetchData} from './utils.js';

const {events} = await fetchData();

const detailsContainer = document.getElementById('detailsContainer');
const queryString = location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id');
const event = events.filter( evt => evt._id == id )[0];

detailsContainer.innerHTML = ` <img src="${event.image}" alt="${event.name}"/>
<div class="mt-3">
  <h2>$ ${event.price}</h2>
  <h3>${event.name} <span class="badge">${event.category}</span></h3>
  <h5>Date: ${event.date}</h5>
  <p class="text-muted">Location: ${event.place}</p>
  <div class="d-flex gap-2">
    <p class="text-muted">Capacity: ${event.capacity}</p>
    <p class="text-muted">Average Assistance: ${event.assistance}</p>
  </div>
  <p>
  ${event.description}
  </p>
</div>`;