import {
  fetchData,
  addAttendancePercentage,
  addRevenues,
  getEventsByCategory,
  calculateStatistics,
  printStatistics,
  printAllEventsStatistics,
} from "./utils.js";

const { events, currentDate } = await fetchData();
addAttendancePercentage(events);
addRevenues(events);
const pastEvents = events.filter((event) => event.date < currentDate);
const upcomingEvents = events.filter((event) => event.date > currentDate);
const upcomingTable = document.getElementById('upcoming');
const pastTable = document.getElementById('past');
const allEventsTable = document.getElementById('allEvents');


const pastEventsByCategory = getEventsByCategory(pastEvents);
const pastStatisticsByCategory = calculateStatistics(pastEventsByCategory);

const upcomingEventsByCategory = getEventsByCategory(upcomingEvents);
const upcomingStatisticsByCategory = calculateStatistics(upcomingEventsByCategory);

printStatistics(upcomingTable, upcomingStatisticsByCategory);
printStatistics(pastTable, pastStatisticsByCategory);
printAllEventsStatistics(events, allEventsTable);