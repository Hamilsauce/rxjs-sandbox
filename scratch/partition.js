const { from, partition, BehaviorSubject, of , fromEvent, interval, merge } = rxjs;
const { scan, map, toArray, concatMap, concatAll, delay, switchMap, tap, mergeMap } = rxjs.operators;

const srcFrom$ = from(['1', '3', '5', 1, 2, 3])
const srcOf$ = of (['1', '3', '5', 2, 4, 6])

const [tids$, codes$] = partition(
  srcFrom$,
  res => typeof res === 'string'
)

// tid$.subscribe(x => console.log(x)); 
codes$
  .pipe(
    // toArray(),
    mergeMap(code => {
      return tids$.pipe(
        map(tid => [code, tid]),
        toArray(),
        scan((acc, curr) => [...acc, curr]),
      )
    }),


  )

  .subscribe(x => console.log(x))


// const randomDelay = (min, max) => Math.floor(Math.random() * max) + min;
// const msg = 'ConcatAll message ';

// const observable = interval(1000).pipe(
//   mergeMap((num) => {
//     return of(msg + num).pipe(
//       delay(randomDelay(1, 4)),
//       map(x => x),
//     )
//   }),
// );

// const sequence$ = interval(1000).pipe(
//   mergeMap((num) => {
//     return of(msg + num).pipe(
//       map(x => x),
//     )
//   }),
// );


// const messageEl = document.querySelector('.app')

// observable.subscribe((message) => messageEl.innerHTML = message);