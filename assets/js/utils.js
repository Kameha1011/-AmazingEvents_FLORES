
export const printEvents = (eventArr, currentDate, condition) =>{
    let eventSkeleton = '';
    const eventSection = document.getElementById('events');
    const eventFragment = document.createDocumentFragment();
    const eventContainer = document.createElement('div');
    eventContainer.classList.add('container', 'd-flex', 'flex-wrap', 'gap-3', 'justify-content-md-center', 'justify-content-center');
    for (let event of eventArr) {
      if (condition === 'past') {
        if(event.date < currentDate){
        // prints past events
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
      }else if (condition === 'future'){
        // prints future events
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
      }else{
        // prints all events
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

export const printCategories = (eventsArray) => {
    let categories = [];
    const filtersContainer = document.getElementById("filters");
    eventsArray.forEach((event) => {
      if (!categories.includes(event.category)) {
        categories.push(event.category);
        filtersContainer.innerHTML += `
        <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          value="${event.category}"
          id="${event.category}"
        />
        <label class="form-check-label" for="${event.category}">
          ${event.category}
        </label>
        </div>`;
      }
    })
  }