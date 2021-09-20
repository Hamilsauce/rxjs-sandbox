import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';;
import { DateService } from '../services/DateService.js'
import StateService from '../services/StateService.js'
// import appCalendar from './components/Calendar.js'

ham.help()
// App

export default class App {
  constructor(calendar) {
    this.root = document.querySelector('.app')
   this.calendar = calendar;
    this.dateService = new DateService();
    this.stateService = new StateService();
    this.calendarData;
    this.root.addEventListener('calendar-month-changed', this.handleSwipeAction.bind(this))
    this.root.addEventListener('dataloaded', this.handleDataLoaded.bind(this))

  }

  handleDataLoaded(e) {
    console.log('heard dataload bitxhez', e);
    this.calendarData = e.detail.data;
    console.log('this.calendarData', this.calendarData)
  }
  handleSwipeAction(e) {
    console.log('e in app', e);
    const month = this.dateService.getNameOfTimeUnit(e.detail.date)
    console.log(month);
    this.root.querySelector('.calendar-month-display').textContent = ham.text.capitalize(month);

  }
}

