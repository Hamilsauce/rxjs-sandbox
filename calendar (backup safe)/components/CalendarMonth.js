import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';;
import CalendarDay from './CalendarDay.js'

/*  CalendarMonth  */

export default class {
  constructor(date, dateService, calendarBodySelector = '.calendar-body') {
    this.dateService = dateService;
    this.date = date;
    this.root = document.querySelector(calendarBodySelector);
    this._dayMap = undefined;
    this.dayMap = new Map();

    this._dayMap2;
    this.dayMap2 = new Map();


    this._weakDayMap;
    // this.dayMap = new WeakMap();

    this._selectedDaysMap = new Map();
    this.monthNumber = +this.dateService.getNameOfTimeUnit(this.date, 'month', 'numeric') - 1;
    this.monthName = this.dateService.getNameOfTimeUnit(this.date, 'month');
    this.dateString = this.date.toDateString();
    this.daysInMonth = this.dateService.daysInMonth() - 1;
    this._selectedDayElement = null;
    this._selectedDays = null;

    this.mapDays(this.daysInMonth);
    // this.weakMapDays(this.daysInMonth);
    this.root.addEventListener('day-clicked', this.handleDayClicked.bind(this));
    // this.root.addEventListener('day-clicked', this.deleteDay.bind(this));
    // console.log('in month constrhctor', this);
  }

  get dayMap() { return this._dayMap }
  set dayMap(newVal) { this._dayMap = newVal }

  get keyElements() { return [...this.dayMap.keys()]; }


  // get selectedDaysMap() { return this._selectedDaysMap }
  get selectedDaysMap() {
    return new Map(this.keyElements.filter(keyEl => this.dayMap.get(keyEl).isSelected).map(keyEl => this.getDay(keyEl)));
  }
  set selectedDaysMap(newSelectedDay) {}

  get selectedDayElement() { return this._selectedDayElement }
  set selectedDayElement(newSelectedDay) {
    const noSelectedDay = this._selectedDayElement === null || undefined;

    if (noSelectedDay) {
      const sel = newSelectedDay;
      const selData = this.dayMap.get(sel);
      selData.isSelected = !selData.isSelected
      this._selectedDayElement = sel
    } else if (this._selectedDayElement === newSelectedDay) {
      this.dayMap.get(this.selectedDayElement).isSelected = false;
      this._selectedDayElement = null;
    } else {
      this.dayMap.get(this.selectedDayElement).isSelected = false;
      this._selectedDayElement = newSelectedDay;
      this.dayMap.get(this.selectedDayElement).isSelected = true;
    }
  }

  setSelectedDays(...selected) {
    for (let [dayEl, data] of this.dayMap) {
      data.isSelected = false;
    }
    selected.forEach(({ data }) => {

      data.isSelected = true

    });

  }

  getDaysByName(name = null) {
    this.setSelectedDays(...this.keyElements.filter(keyEl => this.dayMap.get(keyEl).dayName === name).map(keyEl => this.getDay(keyEl)))
  }

  dayMapFromDOM() {
    const daymap = this.dayMap2;
    const children = [...this.root.children]
    children.forEach(child => this.dayMap2.set(...this.createDay(new Date(2021, this.monthNumber, i + 1), i)))
  }

  deleteDay(e) {
    this.dayMap.delete(e.target);
    this.root.removeChild(e.target)
  }

  getDay(keyElement = undefined) {
    console.log('this in this.dayMap.get(keyElement)', this.dayMap.get(keyElement));
    if (keyElement) return { element: this.dayMap.get(keyElement).root, data: this.dayMap.get(keyElement) }
    else console.error('No key element passed to getDay(). CalendarMonth.js');
  }


  handleDayClicked(e) {
    const dayEl = e.detail.target;
    const day = this.getDay(dayEl);
    this.setSelectedDays(day)
    e.stopPropagation();
  }

  createDay(date, id, el) {
    const newDay = new CalendarDay(date, this.dateService, id, el);
    const dayEl = newDay.render();
    return [dayEl, newDay]
  }

  mapDays() {
    this.dayMap.clear();
    for (let i = 0; i < this.daysInMonth + 1; i++) {
      this.dayMap.set(...this.createDay(new Date(2021, this.monthNumber, i + 1), i));
    }
  }

  renderDays(swipeDirection = null) {
    let millis = 100;

    while (this.root.firstChild) {
      this.root.removeChild(this.root.firstChild)
    }
    this.mapDays(this.daysInMonth);

    if (swipeDirection === 'right') {
      this.root.classList.add('monthChangeRightLeave')
    } else if (swipeDirection === 'left') {
      this.root.classList.add('monthChangeLeftLeave')
    } else {}
    for (let [dayEl, data] of this.dayMap) {
      this.root.appendChild(dayEl);
    }
    millis = 0;
  }
}