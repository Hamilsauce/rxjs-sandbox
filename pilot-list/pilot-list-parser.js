import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';
import {columns, columns$} from './data/schema.js'

import DataService from './services/DataService.js'

const dataService = new DataService();


const { array } = ham;

const { interval, of , fromEvent, merge, empty, delay, from } = rxjs;
const { switchMap, scan, take, takeWhile, map, tap, startWith, filter, mapTo } = rxjs.operators;

// help('pilot list kine 4')
const data = await dataService.fetch('./data/list-data.json')
const listData = await data.json()
console.log(listData);

const newData = listData.map(item => {
  return  {...item, ID: +item.ID }
})

newData.push({
  ID: 50,
  TASK: 'Suck',
  NOTES: 'Did it',
  OWNER: 'Butt',
  STATUS: 'Done'
})
// console.log('res', newData);

const response = await dataService.sendFetch(newData, './data/list-data.json')
const result = await response.json()
console.log('ressult', result);

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

