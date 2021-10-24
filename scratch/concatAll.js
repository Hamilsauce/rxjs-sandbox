const { BehaviorSubject, of , fromEvent, interval, merge } = rxjs;
const { map, concatMap, concatAll, delay, switchMap, tap, mergeMap } = rxjs.operators;


const randomDelay = (min, max) => Math.floor(Math.random() * max) + min;
const msg = 'ConcatAll message ';
const observable = interval(1000).pipe(
  mergeMap((num) => {
    return of(msg + num).pipe(
      delay(randomDelay(1, 4)),
      map(x => x),
      // concatAll()
    )
  }),
  //merge9 values from inner observable
);

const sequence$ = interval(1000).pipe(
  mergeMap((num) => {
    return of(msg + num).pipe(
      // concatAll(),
      // delay(randomDelay(1, 6)),
      map(x => x),
    )
  }),
  // concatAll(),
  //merge9 values from inner observable
);


const messageEl = document.querySelector('.app')

observable.subscribe((message) => messageEl.innerHTML = message);