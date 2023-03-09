import {data} from "./data.js";
import { printEvents, printCategories } from "./utils.js";

printEvents(data.events, data.currentDate, 'future');
printCategories(data.events);
