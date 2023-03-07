import data from "./data.js";
let eventSection = document.getElementById('events');
let eventFragment = document.createDocumentFragment();
let eventContainer = document.createElement('div');
eventContainer.classList.add('container', 'd-flex', 'flex-wrap', 'gap-3', 'justify-content-md-center', 'justify-content-center');
const printUpcomingEvents = (eventArr, currentDate) =>{
    let eventSkeleton = '';
    for (let event of eventArr) {
        if(event.date > currentDate){
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
                  <a href="./details.html" class="btn">See Details</a>
                </div>
              </div> `;
        }
    }
    eventContainer.innerHTML = eventSkeleton;
    eventFragment.appendChild(eventContainer);
    eventSection.appendChild(eventFragment);
}

printUpcomingEvents(data.events, data.currentDate);