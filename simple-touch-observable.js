import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';
import DataService from './services/DataService.js'
import { columns, columns$ } from './data/schema.js'


const dataService = new DataService();
const server = 'http://localhost:3000/list'

const { array } = ham;

const { iif, ReplaySubject, Subject, interval, of , fromEvent, merge, empty, delay, from } = rxjs;
const { throttleTime,mergeMap,switchMap, scan, take, takeWhile, map, tap, startWith, filter, mapTo } = rxjs.operators;


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
