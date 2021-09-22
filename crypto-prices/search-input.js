import CoinService from './CoinService.js'
import syms from './coin-symbols.js'
const { interval, of , fromEvent, merge, empty, from } = rxjs;
const { switchMap, scan, takeWhile,map, tap, startWith,filter, mapTo } = rxjs.operators;
const COUNTDOWN_SECONDS = 10;

const app = document.querySelector('.app');
const searchInput = document.querySelector('.input-group--search');
const children = [...document.querySelector('.app').children];
const coinService = new CoinService();


const symbols$ = of(syms)
console.log('searchInput', searchInput)

/*
 * TODO INPUT EVENT OBSERVABLE TO QUERY API *
 
 */

const input$ = fromEvent(searchInput, 'input');
const inputValue$ = of(searchInput.value);
// const fetchCoin$ = from(coinService.fetchCoin());

inputValue$.pipe(
  filter(e => e.include(e.target.value)),
  map(e => e),
  tap(e => console.log('inputValue$', e))
  
).subscribe();
// input$.pipe(
//   map(e => e.target.value)
  
// ).subscribe();