//* https://blog.angular-university.io/rxjs-switchmap-operator/
const { interval, of , timer, mergeMap, fromEvent, merge, empty, delay, from } = rxjs;
const { switchMap, scan, take, takeWhile, map, tap, startWith, filter, mapTzbo } = rxjs.operators;

console.log('mergeMap', mergeMap)


const app = document.querySelector('.app')
const log = app.querySelector('.log')



function simulateFirebase(val, delay) {

  return interval(delay).pipe(map((index) => {
    let newEl = document.createElement('div')
    newEl.textContent = `Value: ${val}; Index: ${index}`
    log.appendChild(newEl)
    return `${val} ${index}`
  }));
}
const firebase1$ = simulateFirebase('OBS-1', 1200);
const firebase2$ = simulateFirebase('OBS-2', 2400);


//! Simple switchMap example
const firebaseResult$ = firebase1$.pipe(
  mergeMap((sourceValue) => {
    console.log('source value ' + sourceValue);
    let newEl = document.createElement('div')
    newEl.textContent = 'INNER 1 ' + sourceValue;
    log.appendChild(newEl)
    return simulateFirebase('RESULT', 400);
  })
);
const merger$ = merge(firebase1$, firebase2$, firebaseResult$).pipe(
  take(50),
  mergeMap(x => {
    x.pipe(
      tap(x => console.log('in X mergemap pipe', x)),
      map(x => x)
    )
  }),
  tap(x => console.log('in mergemap pipe')),
  tap(x => log.innerHTML = '')
  // timer(2000),
);
merger$.subscribe(console.log, console.error, () => console.log('completed firebaseResult$'));