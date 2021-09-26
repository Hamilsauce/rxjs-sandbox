import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';;


/*  CalendarDay  */

export default class {
  constructor(date, dateService, id, inputRoot = undefined, content) {
    this.root;
    this.dateService = dateService;
    this.id = id;
    this.date = date;
    this.isRendered = false;
    this.dateString = this.date.toDateString()
    this.dayName = dateService.getNameOfTimeUnit(this.date, 'weekday', 'long');
    this.dayNumber = +dateService.getNameOfTimeUnit(this.date, 'day', 'numeric');
    this.isWeekend = ['saturday', 'sunday'].includes(this.dayName);
    this.content = content || 'No plans...';
    this._selectedDayElement;
    this._isSelected = false;



    this.root = inputRoot !== undefined ?
      inputRoot :
      ham.DOM.newElement('div', {
        classList: ['calendar-day', this.isWeekend ? 'weekend' : 'weekday'],
        data: { dayName: this.dayName }
      }, [], '');
    // console.log('this.root = inputRoot', this.root)
    // this.init.bind(this);
    this.root.addEventListener('click', this.handleClicked.bind(this))
  }

  init() {
    // console.log('self', self);
  }
  
  get isSelected() { return this._isSelected }
  set isSelected(newVal) {
    if (newVal === false) this.root.classList.remove('selected')
    else if (newVal === true) this.root.classList.add('selected')
    this._isSelected = newVal;
  }

  template() {
    return `
      <div class="day-header ${this.isSelected ? 'selected' :''}">${this.dayNumber}</div>
      <div class="day-body">${this.content}</div>
    `;
  }

  render() {
    this.root.innerHTML = this.template();
    return this.root;
  }

  handleClicked(e) {
  // console.log('e', e.target);
  console.log('this.root.parentElement', this.root)
    this.root.dispatchEvent(new CustomEvent('day-clicked', { bubbles: true, detail: { target: this.root } }))
    e.stopImmediatePropagation();
  }
}