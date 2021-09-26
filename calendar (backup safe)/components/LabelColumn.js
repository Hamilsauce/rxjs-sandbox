import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';;
// import { DateService } from '../services/DateService.js'
// import CalendarDay from './CalendarDay.js'
// import CalendarMonth from './CalendarMonth.js'

/*  Label Column  */
export default class {
  constructor(root, ...daysToDisplay) {
    this.root = root;
    // console.log('roit', root);
    this.labels = this.createLabels(...daysToDisplay)
    this.dayNameList = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    // console.log('this.dayNameList', this.dayNameList)
 this.currentlySelectedDay = null;
  }

  createLabels(dayList) {
    return dayList.map(day => { return `<div class="day-label" data-day-name="${day}">${day.slice(0)[0].toUpperCase()}${day.slice(1,3).toLowerCase()}</div>` });
  
    
    
  }

  render() {
    ham.DOM.removeAllChildren(this.root)
    this.labels.forEach(label => this.root.insertAdjacentHTML('beforeend', label));
    [...this.root.children].forEach(child => {
      child.addEventListener('click', e => {
        child.classList.toggle('active');
       this.currentlySelectedDay = this.currentlySelectedDay === child.dataset.dayName ? null : child.dataset.dayName;
        this.root.dispatchEvent(new CustomEvent('day-label-clicked', {bubbles: true, detail: {day: this.currentlySelectedDay }}))
      })
    });
    return this.root;
  }

}