import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';;
// import { DateService } from './services/DateService.js'
import appCalendar from './components/Calendar.js'
import App from './components/App.js'
// import stateService from './services/StateService.js'
// import CalendarDay from './components/CalendarDay.js'
// import CalendarMonth from './components/CalendarMonth.js'
// const app = document.querySelector('.app');
// const calendar = document.querySelector('.calendar');
// const calendarBody = document.querySelector('.calendar-body');
// const calendarDays = [...document.querySelectorAll('.calendar-day')];


// ham.help('in calendar vert js')
const app = new App(appCalendar);

setTimeout(() =>  console.log('this state s', app), 1000)



//TODO loop while <= daysInMonth to create
// Day Objects containing: 
// name, WeekOfMonth, dayOfMonth, DayOfWeek, 
// hasOccurred, hasEvent