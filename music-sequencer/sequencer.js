//* https://blog.angular-university.io/rxjs-switchmap-operator/
const { interval, of , timer, fromEvent, merge, empty, delay, from } = rxjs;
const { switchMap, mergeMap, scan, take, takeWhile, map, tap, startWith, filter, mapTzbo } = rxjs.operators;

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
const firebase1$ = simulateFirebase('OBS-1', 2500);
const firebase2$ = simulateFirebase('OBS-2', 1500);


//! Simple switchMap example
const firebaseResult$ = firebase1$.pipe(
  switchMap((sourceValue) => {
   firebase2$.pipe( mergeMap(() => sourceValue),
      map(value => {
        console.log('source value ' + sourceValue);
        let newEl = document.createElement('div')
        newEl.textContent = 'INNER 1 ' + sourceValue;
        // console.log('simulateFirebase('OBS-2', 1500)', simulateFirebase('OBS-2', 1500)).appendChild(newEl))
        return simulateFirebase('mew', 1600);
      }),
      map(value => {
        console.log('source value ' + sourceValue);
        let newEl = document.createElement('div')
        newEl.textContent = 'INNER 1 ' + sourceValue;
        log.appendChild(newEl)
        // return simulateFirebase('RESULT', 1600);
      })
    )
  })
);

const createLogItem = (data) => {
  const el = document.createElement('div');
  el.dataset.count = data;
  el.classList.add('item')
  return el;
}


const merger$ = merge(firebase1$, firebase2$).pipe(
  take(16),
  // mergeMap(x => {
  // map((x,i) => x),
  tap(x => console.log('in mergemap pipe', x)),
  tap(x => log.appendChild(createLogItem(x))),
  // timer(2000),
  // tap(x => log.innerHTML = ''),

);
firebaseResult$.subscribe()
// merger$.subscribe(console.log, console.error, () => console.log('completed firebaseResult$'));