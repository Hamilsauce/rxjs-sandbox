import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';

const { array } = ham;

const { interval, of , fromEvent, merge, empty, delay, from } = rxjs;
const { switchMap, scan, take, takeWhile, map, tap, startWith, filter, mapTo } = rxjs.operators;


export const columns = [
  { name: 'ID', type: 'number', order: 0 },
  { name: 'TASK', type: 'string', order: 1 },
  { name: 'NOTES', type: 'string', order: 2 },
  { name: 'OWNER', type: 'string', order: 3 },
  { name: 'STATUS', type: 'string', order: 4 },
].sort((a, b) => a.order - b.order);

export const columns$ = of ([
  { name: 'ID', type: 'number', order: 1 },
  { name: 'TASK', type: 'string', order: 2 },
  { name: 'NOTES', type: 'string', order: 3 },
  { name: 'OWNER', type: 'string', order: 4 },
  { name: 'STATUS', type: 'string', order: 5 },
].sort((a, b) => a.order - b.order));

{columns, columns$}