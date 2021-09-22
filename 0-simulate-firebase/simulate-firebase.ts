//* https://blog.angular-university.io/rxjs-switchmap-operator/

import { of , interval } from 'rxjs';
import { map, delay } from 'rxjs/operators';

function simulateHttp(val: any, delay: number) {
  return of(val).pipe(delay(del));
}

console.log('simulating HTTP requests');
const http1$ = simulateHttp("1", 1000);
const http2$ = simulateHttp("2", 1000);

http1$.subscribe(
  console.log,
  console.error,
  () => console.log('http1$ completed')
);

http2$.subscribe(
  console.log,
  console.error,
  () => console.log('http2$ completed')
)

//* FAKE HTTP FLOW 
const saveUser$ = simulateHttp(' user saved ', 1000);

const httpResult$ = saveUser$.pipe(
  switchMap((sourceValue) => {
    console.log(sourceValue);
    return simulateHttp(' data reloaded ', 2000);
  })
);

httpResult$.subscribe(console.log, console.error, () => console.log('completed httpResult$'));



//* FAKE FIREBASE FLOW 

function simulateFirebase(val: any, delay: number) {
  return interval(delay).pipe(map((index) => val + ' ' + index));
}

const firebase1$ = simulateFirebase('FB-1 ', 5000);
const firebase2$ = simulateFirebase('FB-2 ', 1000);


//! Simple switchMap example
const firebaseResult$ = firebase1$.pipe(
  switchMap((sourceValue) => {
    console.log('source value ' + sourceValue);
    return simulateFirebase('inner observable ', 1000);
  })
);
firebaseResult$.subscribe(console.log, console.error, () => console.log('completed firebaseResult$'));



//! Combining Outputs of multiple observables with switchMap
const course$ = simulateHttp({ id: 1, description: 'Angular For Beginners' }, 1000);

const httpResult$ = course$.pipe(
  switchMap((courses) => simulateHttp([], 2000)
    .pipe(map((lessons) => [courses, lessons]))
  )
);

httpResult$.subscribe(console.log, console.error, () => console.log('completed httpResult$'));