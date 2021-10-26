import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';

const { array } = ham;

const { interval, of , fromEvent, merge, empty, delay, from } = rxjs;
const { switchMap, scan, take, takeWhile, map, tap, startWith, filter, mapTo } = rxjs.operators;


export const columns = [
  { name: 'id', type: 'number', order: 0 },
  { name: 'task', type: 'string', order: 1 },
  { name: 'notes', type: 'string', order: 2 },
  { name: 'owner', type: 'string', order: 3 },
  { name: 'status', type: 'string', order: 4 },
].sort((a, b) => a.order - b.order);

export const columns$ = of ([
  { name: 'id', type: 'number', order: 1 },
  { name: 'task', type: 'string', order: 2 },
  { name: 'notes', type: 'string', order: 3 },
  { name: 'owner', type: 'string', order: 4 },
  { name: 'status', type: 'string', order: 5 },
].sort((a, b) => a.order - b.order));

{columns, columns$}