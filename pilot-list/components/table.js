import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';
// import DataService from './services/DataService.js'
// import { columns, columns$ } from './data/schema.js'


// const dataService = new DataService();
const server = 'http://localhost:3000/list'

const { array, utils, help } = ham;
console.log(utils)
const { iif, ReplaySubject, Subject, interval, of , fromEvent, merge, empty, delay, from } = rxjs;
const { throttleTime, mergeMap, switchMap, scan, take, takeWhile, map, tap, startWith, filter, mapTo } = rxjs.operators;


/*
 *  CREATING LIST
 *  1. Split text into rows, find the row with most columns if any;
 *      If col count > column array, add generic columns
 *  2. Create Observable from split text
 */

// TABLE COMPONENT
export default class {
  constructor(columns, columns$, listSubject$) {
    console.log('columns', columns)
    this.columns = columns
    this.columns$ = columns$
    this.listSubject$ = listSubject$;

    listSubject$.pipe(
      filter(_ => _ !== undefined),
      map(data => {
        return data.map((_, i) => this.createRowTemplate(this.columns, _, i))
        // return data
      }),
      map(x => this.template(this.columns, x)),
      tap(x => console.log('x', x)),
      tap(x => document.querySelector('.table-container').innerHTML = x),
    ).subscribe()
  }

  validateField(dataType, value) {
    return utils.getValueType(value) === dataType;
  }


  createRowTemplate(cols, record = {}, index) {
    return `
      <tr class="table__row" data-row-index="${index}">
        ${Object.entries(record)
          .reduce((acc, [key, value], i) => {
            const col = cols.find(_ => _.name === key);
            console.log('acc', acc)
            return `${acc}<td class="table__row--field" headers="${col.name}" data-column-order="${col.order}" data-column-name="${col.name}" data-data-type="${col.type}">${this.validateField(col.type, value) ? value : 'ERR'}</td>\n`},'')}
      </tr>` //.join('');
  }

  template(columns, rowMarkup) {
    return `
      <table  class="table">
        <thead>
        <tr class="table__headers>
          ${columns.reduce((acc, col, i) => {
            console.log('[column, columns, key, value]', [col, col,i]);
              return [...acc,`<th class="table__headers--header" id="${col.name}" data-column-order="${col.order}" data-column-name="${col.name}" data-data-type="${col.type}">${col.name}</th>`.replace(',','')];
            },[`<th class="table__headers--header" id="${columns[0].name}" data-column-order="${columns[0].order}" data-column-name="${columns[0].name}" data-data-type="${columns[0].type}">${ columns[0].name }</th>`]).join('\n')
          } 
        <tr>
        <thead>
        <tbody>
          ${rowMarkup.join('')}
        </tbody>
      </table>`
  }


}


/*
const parseRawIntoData = (txt = '') => { return txt.split('\n').map(row => row.trim().split('\x09')) };

const createRecord = (cols = [], record = []) => {
  return Object.entries(newRec).map(rec => {
    const entries =
      console.log(rec);
    return entries
  })

  return newRec
};

const buildDataset = (cols = [], records = []) => {
  return records.map((rec, i, arr) => {
    return createRecord(cols, rec)
  })
};

const app = document.querySelector('.app')
const pre = app.children[0];



dataBody = buildDataset(columns, parseRawIntoData(src))

pre.innerHTML = JSON.stringify(dataBody, null, 3)

console.log('createRecord(parseRawIntoData(src)[0])',
  buildDataset(columns, parseRawIntoData(src))
)

*/