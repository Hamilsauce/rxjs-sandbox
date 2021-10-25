import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';
import DataService from './services/DataService.js'
import { columns, columns$ } from './data/schema.js'


const dataService = new DataService();
const server = 'http://localhost:3000/list'

const { array } = ham;

const { iif, ReplaySubject, Subject, interval, of , fromEvent, merge, empty, delay, from } = rxjs;
const { throttleTime,mergeMap,switchMap, scan, take, takeWhile, map, tap, startWith, filter, mapTo } = rxjs.operators;

/*
NEED JSON SERVER RUNNING IN TERMUX
*/

const r$ = of (`I'm saying R!!`);
const x$ = of (`X's always win!!`);
fromEvent(document.body, 'touchmove')
  .pipe(
    
    throttleTime(500),
    filter((move) => move.changedTouches[0].clientY < 810),
  tap(x => console.log('x', x)),
    map((move) => move.changedTouches[0].clientY),
    mergeMap(yCoord => iif(() => yCoord < 110, r$, x$))
  )
  .subscribe(console.log);


const subject$ = new ReplaySubject(); // Pull values

const listData$ = dataService.fetch(server + '')
// const listData = await data.json()

const data$ = listData$.pipe(
  map(x => x),
  tap(x => console.log('x', x)),
  )
data$.subscribe(x => console.log('ldata' , x))

// const subscriber = { next: (v) => console.log('suber', v) }

// subject$.subscribe(subscriber)

// console.log('lisyda', listData);
// data$.subscribe(subject$)

// const newData = listData.map(item => {
//   return { ...item, ID: +item.ID }
// })

const newItem = {
  ID: 50,
  TASK: 'Suck',
  NOTES: 'Did it',
  OWNER: 'Butt',
  STATUS: 'Done'
}
// console.log('res', newData);


// const response = await dataService.sendFetch(newItem, './data/list-data.json')
// const response = await dataService.sendFetch(newItem, server)
// const result = await response.json()
// console.log('ressult', result);

// console.log('send', send)


let dataBody;
// const numberOfColumns = rows.sort((a, b) => a.match(/\x09/g).length - b.match(/\x09/g).length)

// Record Object Maker
// [...columns.map(x => x.name)].reduce((acc, curr, i) => ({ ...acc, [curr]: null }), {});


/*
 *  CREATING LIST
 *  1. Split text into rows, find the row with most columns if any;
 *      If col count > column array, add generic columns
 *  2. Create Observable from split text
 */

// const parseRawIntoData = (txt = '') => { return txt.split('\n').map(row => row.trim().split('\x09')) };

// const createRecord = (cols = [], record = []) => {
//   const newRec = record.reduce((rec, field, i, arr) => {
//     console.log(cols[i]);
//     // rec[cols[i].name] = field;
//     // return rec
//     // const fieldName = 
//     return ({
//       ...rec,
//       // [cols[i].name == '0' ? rec : rec[cols['ID']] = rec],
//     [i <= arr.length ? cols[i].name : `COLUMN ${i}`]: field
//     })
//   })
//   // return Object.entries(newRec).map(rec => {
//   //   // const entries =  
//   //   console.log(rec);
//   //   return entries
//   // })

//   return newRec
// };

// const buildDataset = (cols = [], records = []) => {
//   return records.map((rec, i, arr) => {
//     return createRecord(cols, rec)
//   })
// };

// const app = document.querySelector('.app')
// const pre = app.children[0];



// dataBody = buildDataset(columns, parseRawIntoData(src))

// pre.innerHTML = JSON.stringify(dataBody,null, 3)

// console.log('createRecord(parseRawIntoData(src)[0])',
//   buildDataset(columns, parseRawIntoData(src))
// )