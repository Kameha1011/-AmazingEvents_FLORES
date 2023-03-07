import data from "./data.js";

/* inner html 
<div class="card">
            <img
              src="./assets/images/Cinema.jpg"
              class="card-img-top"
              alt="Event Picture"
            />
            <div class="card-body">
              <h3 class="card-title">
                Event title <span class="badge">Category Name</span>
              </h3>
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" class="btn">See Details</a>
            </div>
          </div> */
/*     Parent div
        <div
          class="container d-flex flex-wrap gap-3 justify-content-md-between justify-content-center"
        ></div> */
let eventSection = document.getElementById('events');
let eventFragment = document.createDocumentFragment();
let eventContainer = document.createElement('div');
eventContainer.classList.add('container', 'd-flex', 'flex-wrap', 'gap-3', 'justify-content-md-center', 'justify-content-center');
const printPastEvents = (eventArr, currentDate) =>{
    let eventSkeleton = '';
    for (let event of eventArr) {
        if(event.date < currentDate){
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

printPastEvents(data.events, data.currentDate);