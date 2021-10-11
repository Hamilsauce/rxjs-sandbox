const { of , iif, subscribe, fromEvent, merge, empty, from, timer } = rxjs;
const { fromFetch } = rxjs.fetch;
const { switchMap, scan, take, mergeMap, takeWhile, map, tap, startWith, takeUntil, filter, mapTo } = rxjs.operators;


const seed = [
['one', 1],  
['two', 2],  
['three', 3],  
]

const obsMap = of(new Map(seed))

console.log(obsMap);

obsMap.subscribe(x => console.log(x, [...x.entries()]))

// const updateMap$ = obsMap.pipe(
const updateMap$ = obsMap.pipe(
  map(x => {
    x.set('four', 4)
    return x
  })
)

setTimeout(() => {
updateMap$.subscribe(x => console.log('new map', [...x.entries()]));
  
  
}, 2000)

