import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';
// import DataService from './services/DataService.js'
// import { columns, columns$ } from './data/schema.js'


// const dataService = new DataService();
const server = 'http://localhost:3000/list'

const { array, utils, help, DOM } = ham;
// console.log(utils)
const { iif, ReplaySubject, Subject, interval, of , fromEvent, merge, empty, delay, from } = rxjs;
const { throttleTime, distinctUntilChanged, mergeMap, switchMap, scan, take, takeWhile, map, tap, startWith, filter, mapTo } = rxjs.operators;

// console.log('distinctUntilChanged', distinctUntilChanged)
// console.log('help', help())
/*
 *  CREATING LIST
 *  1. Split text into rows, find the row with most columns if any;
 *      If col count > column array, add generic columns
 *  2. Create Observable from split text
 */

// TODO TABLE COMPONENT
export class List {
  constructor(schema, schema$, listSubject$) {
    // console.log('schema', schema)
    this.schema = schema
    this.schema$ = schema$
    this.listSubject$ = listSubject$;
    this.items = [];
    this.root = document.createElement('div')
    this.root.classList.add('list');
    

    listSubject$.pipe(
      filter(_ => _ !== undefined),
      distinctUntilChanged(),
      // tap(x => console.log('x im table', x)),
      map(data => {
        return data.map((record, i) => {
          console.log('djdjd', [record, i]);
          return new Card(({ ...this.schema }), of ({ ...record }), i) //.render(this.schema, data);

          return this.createRowTemplate(this.schema, _, i)
        })
        // return data
      }),
      // tap(x => console.log('x im table', x)),
      tap(x => x.forEach(({element}) => this.root.appendChild(element))),
      // map(x => this.createListItem(this.schema, x)),
      tap(x => document.querySelector('.app').appendChild(this.root))
    ).subscribe()
  }

  validateField(dataType, value) {
    return utils.getValueType(value) === dataType;
  }

  // 
  createListItem(column, record = {}, rowIndex) {
    // console.log('createListItem', [column, record, rowIndex]);
    return

  }

}

// TODO CARD COMP
export class Card {
  // schema === columns
  constructor(schema, data$, index, ...config) {
    this.schema = schema
    this.data$ = data$;
    this.index = index
    
    // console.log('render(schema, itemData)', [schema, data$]);

    this.data$.pipe(
      filter(_ => _ !== undefined),
      tap(x => console.log('in Card data pipe', x)),
      map(x => this.render(this.schema, x)),
      tap(x => this.element = x),
      // tap(x => console.log('after render', x)),
      // tap(x => document.querySelector('.table-container').innerHTML = x),
    ).subscribe()
  }

  validateField(dataType, value) {
    return utils.getValueType(value) === dataType;
  }

  // 
  createRowTemplate(column, record = {}, rowIndex) {
    return

  }

  render(schema, itemData) {
    // console.log('render(schema, itemData)', [schema, itemData]);
    const root = DOM.newElement('div', {
      classList: ['list-item', 'list-card'],
      // data: { index: itemData.id },

    });

    const itemEls = Object.entries(itemData)
      .reduce((acc,[key, value], i) => {
        // console.log('[key, value]', [key, value]);

        const el = DOM.newElement('div', {
          classList: [`item-${key}`, 'item-element'],
          data: { itemElement: value, order: schema.order, itemName: schema.name, dataType: schema.type },
        });
        el.innerHTML =
          `<div class="item-${key}-label">${key}</div>
        <div class="item-${key}-content">${value}</div>`;
        acc.appendChild(el);
        
        return acc;
      }, root);
return root
  }
}


/*
const parseRawIntoData = (txt = '') => { return txt.split('\n').map(row => row.trim().split('\x09')) };

const createRecord = (cols = [], record = []) => {
  return Object.entries(newRec).map(rec => {
    const entries =
      // console.log(rec);
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

// console.log('createRecord(parseRawIntoData(src)[0])',
  buildDataset(columns, parseRawIntoData(src))
)

*/

{ List, Card }