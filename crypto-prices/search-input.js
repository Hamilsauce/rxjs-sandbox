import CoinService from './CoinService.js'
import syms from './coin-symbols.js'
const { interval, of , fromEvent, merge, empty, from } = rxjs;
const { switchMap, scan, take, takeWhile, map, tap, startWith, filter, mapTo } = rxjs.operators;
const COUNTDOWN_SECONDS = 10;

const app = document.querySelector('.app');
const searchInput = document.querySelector('.input-group--search');
const children = [...document.querySelector('.app').children];
const coinService = new CoinService();


const symbols$ = of (syms)
console.log('searchInput', searchInput)

/*
 * TODO INPUT EVENT OBSERVABLE TO QUERY API *
 
 */

const input$ = fromEvent(searchInput, 'input')
// .pipe(switchMap(e => e.target.value))
const inputValue$ = of (searchInput.value);
// const fetchCoin$ = from(coinService.fetchCoin());

const search$ = input$.pipe(
  map(e => e.target.value),
  filter(value => value.length >= 3),
  switchMap(val => {
    console.log('start of swirchmap', val);
    return symbols$.pipe(
      map(symbols => {
        const symbolMatch = symbols.includes(val);
        console.log('symbolMatch', symbolMatch)
      })
    )
  }),
);

search$.subscribe()

// input$.pipe(
//   map(e => e.target.value)

// ).subscribe();