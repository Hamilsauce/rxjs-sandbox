const app = document.querySelector('.app');
const calendar = document.querySelector('.calendar');
const calendarBody = document.querySelector('.calendar-body');
const calendarDays = [...document.querySelectorAll('.calendar-day')];

class Calendar {
  constructor(calendarData) {}

}
class calendarDays { constructor() {}}
class calendarDays { constructor() {}}

const dayNames = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

const date = new Date();

const daysInMonth = (month = new Date().getMonth(), year = new Date().getFullYear()) => {
  return new Date(year, month, 0).getDate();
}

//TODO loop while <= daysInMonth to create
// Day Objects containing: 
// name, WeekOfMonth, dayOfMonth, DayOfWeek, 
// name, WeekOfMonth, dayOfMonth, DayOfWeek, 
// hasOccurred, hasEvent

const getDayName = (dateStr, locale = 'en-US') => {
  var date = new Date(dateStr);
  return date.toLocaleDateString(locale, { weekday: 'long' });
}

console.log('getDayName', getDayName('9/1/2021'))
console.log('days in mo', daysInMonth())