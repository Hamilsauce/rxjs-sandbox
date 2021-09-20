import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';;
import { DateService } from '../services/DateService.js'
import CalendarDay from './CalendarDay.js'
import CalendarMonth from './CalendarMonth.js'
import LabelColumn from './LabelColumn.js'

/*  Calendar  */
class Calendar {
  constructor(selector = '.calendar', dateService) {
    this.root = document.querySelector('.calendar');
    this.calendarBody = this.root.querySelector('.calendar-body');
    this.dateService = dateService
    this.date = new Date(Date.now());
    this.dateString = this.date.toDateString()
    this.activeMonth = new CalendarMonth(this.date, this.dateService)
    this.dayNameList = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    this.init();
  }

  init() {
    this.activeMonth.renderDays();
    const labelColumn = new LabelColumn(this.root.querySelector('.day-label-container'), this.dayNameList);
    ham.DOM.qs('.header-date').textContent = this.dateString
    labelColumn.render();
    this.root.addEventListener('day-label-clicked', this.handleLabelClicked.bind(this))
    this.root.addEventListener('swipe-action', this.handleCalendarSwipe.bind(this))
  }

  createFunction(fn) {}

  handleLabelClicked(e) {
    e.stopPropagation();
    this.activeMonth.getDaysByName(e.detail.day)
  }

  handleCalendarSwipe(e) {
    const swipeDirection = e.detail.swipeDirection
    const swipeClass = swipeDirection === 'right' ? 'monthChangeRightLeave' : 'monthChangeLeftLeave'
    let thisMonth;

    setTimeout(() => {
      this.calendarBody.classList.add(swipeClass)
  
        this.activeMonth = undefined;
      if (swipeDirection === 'left') {
        thisMonth = this.date.getMonth() +1;
        this.date.setMonth(thisMonth);
      } else if (swipeDirection === 'right') {
        this.activeMonth = undefined;
        thisMonth = this.date.getMonth()-1;
        this.date.setMonth(thisMonth);
      }

      const newDate = new Date(this.date.getFullYear(), thisMonth +1,  0);
      this.activeMonth = new CalendarMonth(new Date(this.date.getFullYear(),thisMonth+1, 0), this.dateService);
      this.activeMonth.renderDays();
      e.stopPropagation();
      this.root.dispatchEvent(new CustomEvent('calendar-month-changed', { bubbles: true, detail: { date: newDate } }));
    }, 0);

    this.calendarBody.classList.remove(swipeClass);
    this.calendarBody.classList.remove('monthChangeLeftLeave');
    this.calendarBody.classList.remove('monthChangeLeftEnter');
    this.calendarBody.classList.remove('monthChangeRightLeave');
    this.calendarBody.classList.remove('monthChangeRightEnter');

  }
};

const fetchCalendarData = () => {}


const calendarFactory = (selector) => {
  return new Calendar(selector, new DateService())
};

export default calendarFactory('.calendar')