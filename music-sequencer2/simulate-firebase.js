//* https://blog.angular-university.io/rxjs-switchmap-operator/

const { interval, of , fromEvent, merge, empty, delay, from } = rxjs;
const { switchMap, scan, take, concatMap,takeWhile, map, tap, startWith, filter, mapTo } = rxjs.operators;

// console.log('delay', delay);

const app = document.querySelector('.app')
const log = app.querySelector('.log')

function simulateHttp(val, del) {
  return of(val).pipe(delay(del));
}

console.log('simulating HTTP requests');
const http1$ = simulateHttp("1", 2000);
const http2$ = simulateHttp("2", 1000);

// http1$.subscribe(
//   console.log,
//   console.error,
//   () => console.log('http1$ completed')
// );

// http2$.subscribe(
//   console.log,
//   console.error,
//   () => console.log('http2$ completed')
// )

//* FAKE HTTP FLOW 
const saveUser$ = simulateHttp(' user saved ', 1000);

let httpResult$ = saveUser$.pipe(
  switchMap((sourceValue) => {
    console.log(sourceValue);
    return simulateHttp(' data reloaded ', 2000);
  })
);

// httpResult$.subscribe(console.log, console.error, () => console.log('completed httpResult$'));

/* TODO
*
 * FAKE FIREBASE FLOW 
*
  TODO */

function simulateFirebase(val, delay) {

  return interval(delay).pipe(map((index) => {
      let newEl = document.createElement('div')
      newEl.textContent = `${val} ${index}`
      log.appendChild(newEl)
      return `${val} ${index}`
  }));
}

const firebase1$ = simulateFirebase('BEAT 1 ', 1200);
const firebase2$ = simulateFirebase('BEAT 2 ', 800);


//! Simple switchMap example
const firebaseResult$ = firebase1$.pipe(
  concatMap((sourceValue) => {
    console.log('source value ' + sourceValue);
    let newEl = document.createElement('div')
    newEl.textContent = 'BEAT 0 ' + sourceValue;
    log.appendChild(newEl)
    return simulateFirebase('BEAT 10 ', 1600);
  })
);
const merger$ = merge(firebase1$, firebase2$, firebaseResult$)
merger$.subscribe(console.log, console.error, () => console.log('completed firebaseResult$'));



//! Combining Outputs of multiple observables with switchMap
const course$ = simulateHttp({ id: 1, description: 'Angular For Beginners' }, 1000);

httpResult$ = course$.pipe(
  switchMap((courses) => simulateHttp([], 1200)
    .pipe(map((lessons) => [courses, lessons]))
  )
);

// httpResult$.subscribe(console.log, console.error, () => console.log('completed httpResult$'));