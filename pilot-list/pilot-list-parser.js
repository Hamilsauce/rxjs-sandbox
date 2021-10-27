import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';
import DataService from './services/DataService.js'
import {List,Card} from './components/table.js'
import { columns, columns$ } from './data/schema.js'


const dataService = new DataService();
const server = 'http://localhost:3000/list'

const { array } = ham;

const { iif, ReplaySubject,AsyncSubject, Subject, interval, of , fromEvent, merge, empty, delay, from } = rxjs;
const { throttleTime, mergeMap, switchMap, scan, take, takeWhile, map, tap, startWith, filter, mapTo } = rxjs.operators;

/*
NEED JSON SERVER RUNNING IN TERMUX
*/

const app = document.querySelector('.app')
const tableContainer = app.querySelector('.table-container')

const listDataSubject$ = dataService.listDataSubject$
dataService.fetch(server + '')
// const table = new Table(listDataSubject$);

const listData$ = listDataSubject$.pipe(
  // take(1),
  filter(x => x !== undefined),
  tap(x => console.log('x', x)),
);

// listData$.subscribe(x => console.log('ldata', x))

const newItem = {
  id: 30,
  TASK: 'Dont suck',
  NOTES: 'Did it',
  OWNER: 'Butt',
  STATUS: 'Done'
}

const list = new List(columns,  columns$, listDataSubject$);
console.log('list', list);

// tableContainer.innerHTML = table.template()

// const response$ = dataService.sendFetch(newItem, './data/list-data.json')
// const response = await dataService.sendFetch(newItem, server)
// console.log('response', response)

// response$.pipe(
//   tap(x => console.log('x', x)),
// )
// console.log('ressult', result);

// console.log('send', send)



let dataBody;