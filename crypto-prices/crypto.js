import CoinService from './CoinService.js';
import CsvService from './data/btc-data.js';
import searchInput$ from './search-input.js';
const { interval, fromEvent, merge, empty } = rxjs;
const { switchMap, scan, takeWhile, startWith, map, mapTo } = rxjs.operators;
const COUNTDOWN_SECONDS = 10;

const app = document.querySelector('.app');
const coinService = new CoinService();
const csvService = new CsvService();


csvService.fetch().pipe(
  map((data) => {
    console.log('slut', data);
    
    app.querySelector('.json').firstElementChild.innerHTML = JSON.stringify(data, null, 3);
    
    return data
  })
).subscribe();



searchInput$.pipe(
  map(({ data }) => {
    app.querySelector('.name-output').textContent = data.name;
    app.querySelector('.price-output').textContent = data.ohlc.c;
    return data
  })
).subscribe();

// coinService.fetchCoin('', app)


// Homemade Recusrive timer
let count = 9;
const timer1 = (n) => {
  if (n <= 0) return n;
  else {
    console.log(n);
    setTimeout(() => timer1(--n), 500)
  }
};
// timer1(count)

/*

const remainingLabel = document.getElementById('remaining');
const pauseButton = document.getElementById('pause');
const resumeButton = document.getElementById('resume');

// streams
const interval$ = interval(1000)
  .pipe(mapTo(-1));

const pause$ = fromEvent(pauseButton, 'click')
  .pipe(mapTo(false));

const resume$ = fromEvent(resumeButton, 'click')
  .pipe(mapTo(true));

const timer$ = merge(pause$, resume$)
  .pipe(
    startWith(true),
    switchMap(val => (val ? interval$ : empty())),
    scan((acc, curr) => (curr ? curr + acc : acc), COUNTDOWN_SECONDS),
    takeWhile(v => v >= 0)
  )
  .subscribe((val) => (remainingLabel.innerHTML = val));
  
  */